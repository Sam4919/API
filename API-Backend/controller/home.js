//controller中用于提供，路由的处理函数
module.exports = {
  //测试路由的处理函数
  async test(ctx) {
    //console.log(ctx.mongoClient)
    // 方式一：常规的抛出错误方式
    // throw new Error('一个错误1')

    // 方式二：Koa 封装的抛出错误工具函数
    //return ctx.throw({ code: 40011, message: '一个错误2' })

    // 请求参数的校验：是否存字符串类型的 name 参数；校验失败会抛出 Error 对象
    // ctx.verifyParams({
    //   name: 'string'
    // })
    ctx.body = {
      msg: 'ok1',
    }
  },

  //测试鉴权的处理函数
  async test2(ctx){
    ctx.body = {
      msg:'请求成功，通过鉴权'
    }
  }
}
