
const { getCurrentUserProfile,updateProfileBaseInfo,updateProfilePassword,updateProfileAvatar} = require('../service/profile') 

module.exports={
  async getProfile(ctx){
    //获取登陆用户的个人信息
    const result = await getCurrentUserProfile(ctx)
    //返回成功数据
    ctx.body = {
      code:0,
      message:'获取个人信息成功',
      data:result
    }
  },
  async updateProfileBaseInfo(ctx){
    //校验参数
    ctx.verifyParams({
      nickname:'string'
    })

    //修改个人资料
    await updateProfileBaseInfo(ctx,ctx.request.body)

    //返回成功数据
    ctx.body={
      code:0,
      message:'修改个人资料成功',
      data:true
    }
  },
  async updateProfilePassword(ctx){
    //校验参数
    ctx.verifyParams({
      oldPassword:'string',
      newPassword:'string'
    })
    //修改登陆密码
    await updateProfilePassword(ctx,ctx.request.body)

    //返回成功数据
    ctx.body={
      code:0,
      message:'登陆密码修改成功',
      data:true
    }
  },
  async updateProfileAvatar(ctx){
  //校验参数
  ctx.verifyParams({
    avatar:'string'
  })
  //修改头像地址
  await updateProfileAvatar(ctx,ctx.request.body)

  //返回成功数据
  ctx.body={
    code:0,
    message:'修改头像成功',
    data:true
  }
  }
}