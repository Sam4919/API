const { GetApi, PutApi, PostApi, DeleteApi } = require("../service/ApiCreate")

module.exports = {
  async GetApi(ctx) {
    //校验参数
    ctx.verifyParams({
      user: "string",
      title: "string",
    })

    const result = await GetApi(ctx, ctx.request.body)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "使用GetAPI成功",
      data: result,
    }
  },

  async PutApi(ctx) {
    //校验参数
    ctx.verifyParams({
      user: "string",
      title: "string",
      Params: "object",
    })

    const result = await PutApi(ctx, ctx.request.body)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "使用PutAPI成功",
      data: result,
    }
  },

  async PostApi(ctx) {
    //校验参数
    ctx.verifyParams({
      user: "string",
      title: "string",
      Params: "object",
    })

    const result = await PostApi(ctx, ctx.request.body)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "使用PostAPI成功",
      data: result,
    }
  },

  async DeleteApi(ctx) {
    //校验参数
    ctx.verifyParams({
      user: "string",
      title: "string",
      Params: "object",
    })

    const result = await DeleteApi(ctx, ctx.request.body)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "使用DeleteAPI成功",
      data: result,
    }
  },
}
