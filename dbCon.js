const { MongoClient } = require('mongodb');

module.exports = async () => {
    return await MongoClient.connect(process.env.SRV)
}