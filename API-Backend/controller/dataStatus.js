const { StatusChange } = require("../service/dataStatus")
module.exports = {
  async StatusChange(ctx) {
    //校验参数
    ctx.verifyParams({
      title: "string",
      Status: "string",
    })

    await StatusChange(ctx, ctx.request.body)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "修改状态成功",
    }
  },
}
