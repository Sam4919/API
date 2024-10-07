const path = require("path");
      const apiPath = path.join(__dirname, "..", "..", "service", "CreatedApiFile", "tunnel_visualizationDeleteAPI");
      const { DeleteApi } = require(apiPath);

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
