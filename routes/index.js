const express = require("express");
const User = require('./users');
const Product = require('./products');
const Category = require('./category');
const Order = require('./order');
let dbConn = require('../dbCon');
const Routes = ((router = express.Router())=>{
    User(router,dbConn);
    Product(router,dbConn);
    Category(router,dbConn);
    Order(router,dbConn);
    return router;
})

module.exports = Routes();