const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
const router = require('./routes')
app.use(express.json())
app.use(router);

app.listen(4500,()=>{
    console.log("Server is Listening on Port 4500");
})