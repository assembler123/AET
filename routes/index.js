const express = require("express");
const User = require('./users');
const Product = require('./products');
const Category = require('./category');
const Order = require('./order');
const dbConn = require('../dbCon');
const Routes = ((router = express.Router(),dbConn)=>{
    User(router);
    Product(router);
    Category(router);
    Order(router);
    return router;
})

module.exports = Routes();