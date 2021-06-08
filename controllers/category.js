const redisClient = require("../redisCon");
const asyncRedis = require("async-redis");
const asyncRedisClient = asyncRedis.decorate(redisClient);
const qs = require('query-string')
const ObjectId = require('mongodb').ObjectId;
const clearCategoryCache = async()=>{
    await asyncRedisClient.hdel('category', 'getAllCategory');
    await asyncRedisClient.hdel('category', 'showAllCategory');                
}
module.exports = {
    getAllCategory: async (dbcon,req) => {
        try {
            if(req.url.split('?').length>1){
                let q = qs.parse(req.url.split('?')[1]);
                let showAll = q.showAll;
                if(showAll){
                    let reply = await asyncRedisClient.hget('category','showAllCategory');
                    
                    if(reply){
                        return JSON.parse(reply);
                    }
                    else{
                        let d = await dbcon.collection('Category').find({ isDeleted: false}).toArray();
                        console.log(await asyncRedisClient.hset('category', 'showAllCategory', JSON.stringify(d)));
                        return d;
                    }
                }
            }
            let reply = await asyncRedisClient.hget('category', 'getAllCategory');
            console.log("Reply--->>>", reply)
            if (reply) {
                // console.log(data);
                return JSON.parse(reply);
            }
            else {
                let d = await dbcon.collection('Category').find({ isDeleted: false, isVisible: true }).toArray();
                // console.log("--- Get from DB ---")
                console.log(await asyncRedisClient.hset('category', 'getAllCategory', JSON.stringify(d)));
                // console.log(d);
                return d;
            }
        } catch (er) {
            console.log(er);
        }
    },
    addCategory: async (dbcon, bodyObj) => {
        if (bodyObj.title && (bodyObj.filters || bodyObj.filters == [])) {
            let { title, filters } = bodyObj;
            try {
                let d = await dbcon.collection('Category').insertOne({
                    title, filters, isVisible: false, isDeleted: false
                })
                if (d) {
                    await clearCategoryCache();
                    return true
                }
                return false;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
        else
            return false

    },
    toggleVisible: async (dbcon, { id, toVisible }) => {
        // console.log("GOT ID ---->>> ",id,toVisible);
        try {
            let d = await dbcon.collection('Category').findOneAndUpdate({ _id: new ObjectId(id) }, { $set:{isVisible: toVisible} })
            
            if (d) {
                await clearCategoryCache();
                return true
            }
            return false;
        } catch (e) {
            console.log(e);
            return false
        }
    },
    deleteCategory: async (dbcon, {id})=>{
        try{
            let d = await dbcon.collection('Category').findOneAndUpdate({_id: new ObjectId(id)},{$set:{isDeleted: true}});
            if(d){
                await clearCategoryCache();
                return true
            }
            return false;
        }catch(e){
            console.log(e);
            return false;
        }
    }
}