const path = require("path");
      const apiPath = path.join(__dirname, "..", "..", "service", "CreatedApiFile", "bridge_visualization_2GetAPI");
      const { GetApi } = require(apiPath);

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
