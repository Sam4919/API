const { ApiList } = require("../service/ApiList")

module.exports = {
  async ApiList(ctx) {
    const username = ctx.query.username
    console.log(username)
    const result = await ApiList(ctx, username)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "获取APIList成功",
      data: result,
    }
  },
}
