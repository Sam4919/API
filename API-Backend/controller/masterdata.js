const {listData} = require('../service/masterdata')
module.exports = {
  async listData(ctx){
    //直接查询
    const result = await listData(ctx)

    //返回成功的结果
    ctx.body = {
      code:0,
      message:'获取master数据成功',
      data:result
    }
  }
}