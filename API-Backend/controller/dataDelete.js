const { dataDelete } = require("../service/dataDelete")

module.exports = {
  async dataDelete(ctx) {
    //校验参数
    ctx.verifyParams({
      title: "string",
      user: "string",
    })

    await dataDelete(ctx, ctx.request.body)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "删除data成功",
    }
  },
}
