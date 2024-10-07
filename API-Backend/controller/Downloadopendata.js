const {getDownloadopendata} = require('../service/Downloadopendata')
module.exports = {
  async getDownloadopendata(ctx){
    //直接查询
    //获取地址路径中的动态参数
    const name = ctx.params.id
    //根据id查询详情信息
    const result = await getDownloadopendata(ctx,name)
   

    //返回成功的结果
    ctx.body = {
      code:0,
      message:'获取record数据成功',
      data:result
    }
  }
}