module.exports = (routeTo) => {
    routeTo.get('/category',(req,res)=>{
        res.send("Category Routes");
    })
}