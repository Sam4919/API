//自定义中间件：将mongodb客户端实例挂载到ctx对象上

//导入mongodb客户端实例
const mongoClient = require('../database/mongodb')

module.exports = (options)=>{
  //返回真正的中间件函数
  return async (ctx,next)=>{
    ctx.mongoClient = mongoClient
    await next()
  }
}