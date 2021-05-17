module.exports = (routeTo) => {
    routeTo.get('/order',(req,res)=>{
        console.log("Routersss--->>>>",routeTo)
        res.send("Orders Routes");
    })
}