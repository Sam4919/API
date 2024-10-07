const {listData,getListDataById,updataListData} = require('../service/recorddata')
module.exports = {
  async listData(ctx){
    //直接查询
    const result = await listData(ctx)

    //返回成功的结果
    ctx.body = {
      code:0,
      message:'获取record数据成功',
      data:result
    }
  },
  async detail(ctx){
    //获取地址路径中的动态参数
    const id = ctx.params.id
    // console.log(id)
    //根据id查询文章详情信息
    const result = await getListDataById(ctx,id)

    //返回成功数据
    ctx.body = {
      code:0,
      message:'文章获取成功',
      data: result
    }
  },
  async updata(ctx){
   
    //校验参数
    ctx.verifyParams({
      _id:'string',
      Date:'string',
      Id:'string',
      Inspector:'string',
      Keisiki:'string',
      Name:'string',
      //Pass:'string',
      Rank:'string',
      Road:'string'
    })
    //获取路径中的动态参数id
    const id = ctx.params.id

    //修改文章
    await updataListData(ctx,id,ctx.request.body)

    //返回成功数据
    ctx.body = {
      code:0,
      message:'文章修改成功',
      data:true
    }
  }
}