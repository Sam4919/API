const { DeleteApi } = require("../service/Public/publicDeleteApi")

module.exports = {
  async DeleteApi(ctx) {
    const Id = ctx.params.id
    const result = await DeleteApi(ctx, Id)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "使用DeleteAPI成功",
      data: result,
    }
  },
}
