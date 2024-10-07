const { PutApi } = require("../service/Public/publicPutApi")

module.exports = {
  async PutApi(ctx) {
    //校验参数
    ctx.verifyParams({
      Params: "object",
      user: "string",
      title: "string",
    })
    const result = await PutApi(ctx, ctx.request.body)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "使用PutAPI成功",
      data: result,
    }
  },
}
