const {
  createGetApi,
  createPutApi,
  createPostApi,
  createDeleteApi,
} = require("../service/ApiCreate")

module.exports = {
  async createGetApi(ctx) {
    //校验参数
    ctx.verifyParams({
      user: "string",
      title: "string",
    })

    const result = await createGetApi(ctx, ctx.request.body)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "生成API成功",
      data: result,
    }
  },

  async createPutApi(ctx) {
    //校验参数
    ctx.verifyParams({
      user: "string",
      title: "string",
    })

    const result = await createPutApi(ctx, ctx.request.body)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "生成API成功",
      data: result,
    }
  },

  async createDeleteApi(ctx) {
    //校验参数
    ctx.verifyParams({
      user: "string",
      title: "string",
    })

    const result = await createDeleteApi(ctx, ctx.request.body)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "生成API成功",
      data: result,
    }
  },

  async createPostApi(ctx) {
    //校验参数
    ctx.verifyParams({
      user: "string",
      title: "string",
    })

    const result = await createPostApi(ctx, ctx.request.body)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "生成API成功",
      data: result,
    }
  },
}
