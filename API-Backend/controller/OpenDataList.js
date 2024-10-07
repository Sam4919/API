const {getopendatalist} = require('../service/OpenDataList')

module.exports = {
  async getopendatalist(ctx){
    const result = await getopendatalist(ctx)

    //返回成功的结果
    ctx.body = {
      code:0,
      message:'获取record数据成功',
      data:result
    }
  }
}
