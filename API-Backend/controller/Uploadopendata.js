const {Uploadopensystem,Uploadopendata} = require('../service/Uploadopendata')
//1.获取上传信息2.区分是系统还是数据3.
module.exports = {
  async Uploadopensystem(ctx){
    //校验参数
    ctx.verifyParams({
      user:'string',
      title:'string',
      content:'string',
      category:'string',
      systemURL:'string',
      ManualURL:'string'
    })
    await Uploadopensystem(ctx,ctx.request.body)
    //返回成功数据
    ctx.body = {
      code:0,
      message:'上传系统成功',
      data:true
    }
  },

  async Uploadopendata(ctx){
    //校验参数
    ctx.verifyParams({
      user:'string',
      title:'string',
      content:'string',
      category:'string',
      fileGenre:'string',
      JSON:"array"
    })
    
    await Uploadopendata(ctx,ctx.request.body)
    
    //返回成功数据
    ctx.body = {
      code:0,
      message:'上传数据成功',
      data:true
    }
  }
}