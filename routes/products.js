const Products = require('../controllers/products')
const dbCon = require('../dbCon'); 
module.exports = (routeTo) => {
    let dbo = await dbCon();
    dbc = dbo.db('ECOM') 
    routeTo.get('/addProducts',(req,res)=>{
        res.send("Products Routes");
    })
    routeTo.post('/products',async(req,res)=>{
        res.send("N")
    })

}