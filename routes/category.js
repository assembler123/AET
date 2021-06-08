const Category = require('../controllers/category');
const dbCon = require('../dbCon'); 
// console.log("CAtegoryt Route ka dbconn---->>>",dbCon)
module.exports = async (routeTo) => {
    let dbo = await dbCon();
    dbc = dbo.db('ECOM') 
    routeTo.get('/category',async (req,res)=>{
        let data = await Category.getAllCategory(dbc,req)
        if(data)
        res.send(JSON.stringify({success:true,Category:data})).status(200);
        else
        res.send({success:false,Category:[]}).status(404);
    })
    routeTo.post('/addCategory',async (req,res)=>{
        if(req.body.title){
            let data = await Category.addCategory(dbc,req.body)
            if(data)
            res.send(JSON.stringify({success:true})).status(200);
            else
            res.send(JSON.stringify({success:false})).status(500);
        }else{
            res.send({success:false}).status(400)
        }
    })
    routeTo.put('/toggleCategory',async (req,res)=>{
        if(req.body.id&&(req.body.toVisible || !req.body.toVisible)){
            let data = await Category.toggleVisible(dbc,req.body);
            if(data)
                res.send(JSON.stringify({success:true})).status(200);
            else
                res.send(JSON.stringify({success:false})).status(500)    
        }else{
            res.send({success:false}).status(400)
        }
    })
    routeTo.delete('/deleteCategory',async (req,res)=>{
        if(req.body.id){
            let data = await Category.deleteCategory(dbc,req.body);
            if(data)
                res.send(JSON.stringify({success:true})).status(200);
            else
                res.send({success:false}).status(500);
        }else{
            res.send({success:false}).status(400)
        }
    })
    
}