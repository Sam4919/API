const { apiDelete } = require("../service/apiDelete")

module.exports = {
  async apiDelete(ctx) {
    //校验参数
    ctx.verifyParams({
      API: "string",
      methods: "string",
      username: "string",
    })

    await apiDelete(ctx, ctx.request.body)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "删除API成功",
    }
  },
}
