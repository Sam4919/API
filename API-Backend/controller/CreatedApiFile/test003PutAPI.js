const path = require("path");
      const apiPath = path.join(__dirname, "..", "..", "service", "CreatedApiFile", "test003PutAPI");
      const { PutApi } = require(apiPath);

module.exports = {
  async PutApi(ctx) {
    //校验参数
    ctx.verifyParams({
      Params: "object",
      user: "string",
      title: "string",
    })
    const result = await PutApi(ctx, ctx.request.body)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "使用PutAPI成功",
      data: result,
    }
  },
}
