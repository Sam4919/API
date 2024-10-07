const { ApiOperation } = require("../service/ApiOperation")

module.exports = {
  async ApiOperation(ctx) {
    //校验参数
    // ctx.verifyParams({})

    const result = await ApiOperation(ctx, ctx.request.body)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "生成API成功",
      data: result,
    }
  },
}
