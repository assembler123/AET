const express = require("express");
const app = express();
const router = require('./routes')
app.use(express.json())
app.use(router)
app.listen(4500,()=>{
    console.log("Server is Listening on Port 4500");
})