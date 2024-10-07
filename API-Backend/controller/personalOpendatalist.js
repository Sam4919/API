const { personalOpendatalist } = require("../service/personalOpendatalist")

module.exports = {
  async personalOpendatalist(ctx) {
    const username = ctx.query.username
    console.log(username)
    const result = await personalOpendatalist(ctx, username)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "获取personalOpendataList成功",
      data: result,
    }
  },
}
