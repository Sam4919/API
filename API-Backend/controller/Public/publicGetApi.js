const { GetApi } = require("../service/Public/publicGetApi")

module.exports = {
  async GetApi(ctx) {
    const result = await GetApi(ctx, ctx.request.body)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "使用GetAPI成功",
      data: result,
    }
  },
}
