const redisClient = require("../redisCon");
const asyncRedis = require("async-redis");
const asyncRedisClient = asyncRedis.decorate(redisClient);
module.exports = {
    getAllCategory: async (dbcon) => {
        try {
            let reply = await asyncRedisClient.hget('category', 'getAllCategory');
            console.log("Reply--->>>",reply)
            if (reply) {
                // console.log(data);
                return JSON.parse(reply);
            }
            else {
                let d = await dbcon.collection('Category').find({ isDeleted: false, isVisible: true },{_id:0}).toArray();
                console.log("--- Get from DB ---")
                console.log(await redisClient.hset('category', 'getAllCategory', JSON.stringify(d)));
                // console.log(d);
                return d;
            }
        } catch (er) {
            console.log(er);
        }
    },
    addCategory : async(dbcon,{title}) => {
        try{
            let d = await dbcon.collection('Category').insertOne({
                title,isVisible:false,isDeleted:false
            })
            if(d){
                return true
            }
            return false;
        }catch(e){
            console.log(e);
            return false;
        }
    }
}
