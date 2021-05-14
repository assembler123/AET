const express = require("express");
const app = express();
app.get("/product/:pid",(req,res)=>{
    res.send(`Hello!!!!!! from ${req.params.pid}`)
})
app.listen(4500,()=>{
    console.log("Server is Listening on Port 4500");
})