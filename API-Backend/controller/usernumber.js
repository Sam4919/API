const {listData,add,reduce,userLoginData} = require('../service/usernumber')

module.exports = {
  async listData(ctx){
    //直接查询
    const result = await listData(ctx)

    //返回成功的结果
    ctx.body = {
      code:0,
      message:'获取usernumber数据成功',
      data:result
    }
  },
  async add(ctx){

    ctx.verifyParams({
      _id:'string',
      usernumbers:'number'
    })
    //获取路径中的动态参数id
    const id = ctx.params.id
    
    //修改文章
    await add(ctx,id,ctx.request.body)

    //返回成功的结果
    ctx.body = {
      code:0,
      message:'更新usernumber数据成功',
      data:true
    }
  },
  async reduce(ctx){
    //直接查询
    const result = await reduce(ctx)

    //返回成功的结果
    ctx.body = {
      code:0,
      message:'获取usernumber数据成功',
      data:result
    }
  },
  async userLoginData(ctx){
    //直接查询
    const result = await userLoginData(ctx)

    //返回成功的结果
    ctx.body = {
      code:0,
      message:'获取userLoginNumber数据成功',
      data:result
    }
  }
}