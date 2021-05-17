module.exports = (routeTo) => {
    routeTo.get('/user',(req,res)=>{
        res.send("Users Routes");
    })
}