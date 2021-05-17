module.exports = (routeTo) => {
    routeTo.get('/products',(req,res)=>{
        res.send("Products Routes");
    })
    routeTo.post('/products',(req,res)=>{
        res.send(
            "N"
        )
    })

}