const {MongoClient} = require('mongodb')
//引入配置文件
const config = require('../config/config.default')
//创建客户端实例，从config中读取
const client = new MongoClient(config.mongodb.uri,config.mongodb.options)
//开始链接
client.connect()

module.exports = client