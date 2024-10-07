const path = require("path");
      const apiPath = path.join(__dirname, "..", "..", "service", "CreatedApiFile", "test003PostAPI");
      const { PostApi } = require(apiPath);

module.exports = {
  async PostApi(ctx) {
    //校验参数
    ctx.verifyParams({
      user: "string",
      title: "string",
      Params: "object",
    })

    const result = await PostApi(ctx, ctx.request.body)

    //返回成功的结果
    ctx.body = {
      code: 0,
      message: "使用PostAPI成功",
      data: result,
    }
  },
}
