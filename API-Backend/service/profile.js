const { hash, compare } = require("bcrypt")
const { ObjectId } = require("mongodb")

async function getCurrentUserProfile(ctx){
  //获取当前用户的id
  const currentUserId = new ObjectId(ctx.state.user.sub)
  //去数据库查询信息
  const userColl = ctx.mongoClient.db().collection('users')
  const result = await userColl.findOne({_id:currentUserId})
  return result


}
async function updateProfileBaseInfo(ctx,params){
  //获取用户id
  const currentUserId = new ObjectId(ctx.state.user.sub)
  const nickname = params.nickname

  //修改个人资料
  const userColl = ctx.mongoClient.db().collection('users')
  await userColl.updateOne({
    _id:currentUserId
  },{
    $set:{
      nickname
    }
  })
} 
async function updateProfilePassword(ctx,params){
  const currentUserId = new ObjectId(ctx.state.user.sub)
  const {oldPassword,newPassword}= params

  //获取当前用户
  const userColl = ctx.mongoClient.db().collection('users')
  const user = await userColl.findOne({_id:currentUserId})

  //对比新旧的密码是否正确
  const isValidOldPass = await compare(oldPassword,user.password)
  if(!isValidOldPass){
    return ctx.throw({code:10302,message:'输入的旧密码不正确'})
  }

  //修改密码(进行hash加密)
  const passwordHash = await hash(newPassword,10)
  await userColl.updateOne({
    _id:currentUserId
  },{
    $set:{
      password:passwordHash
    }
  })


}
async function updateProfileAvatar(ctx,params){
const currentUserId = new ObjectId(ctx.state.user.sub)
const avatar = params.avatar

//操作数据库，根据对应的id的用户头像
const userColl = ctx.mongoClient.db().collection('users')
await userColl.updateOne({
  _id:currentUserId
},{
  $set:{
    avatar
  }
})
}

module.exports={getCurrentUserProfile,updateProfileBaseInfo,updateProfilePassword,updateProfileAvatar}