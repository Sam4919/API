const { StatusChange } = require("../service/apiStatus")
module.exports = {
  async StatusChange(ctx) {
    console.log(ctx.request.body)
    //校验参数
    ctx.verifyParams({
      API: "string",
      methods: "string",
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
