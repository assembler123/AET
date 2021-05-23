
const redis = require('redis');
const redisClient = redis.createClient({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
});
redisClient.on('error',(e)=>{
    console.log('xxxxxxxx-----------------error in Redissss----->>>>',e)
})

redisClient.on('connect', function () {
    console.log('connected to redis!!');
});
module.exports = redisClient