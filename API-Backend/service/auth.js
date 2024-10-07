const { hash,compare } = require('bcrypt')
const svgCaptcha = require('svg-captcha')
const { Base64 } = require('js-base64')
const { ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')
const config = require('../config/config.default')
/**
 * 检查用户名是否存在
 * @param {*} ctx
 * @param {*} useremail
 */
async function checkuseremailExist(ctx, useremail) {
  const userColl = ctx.mongoClient.db().collection('User')
  const user = await userColl.findOne({ useremail })
  return !!user
}

async function doRegister(ctx, userInfo) {
  const { useremail, username, password } = userInfo

  //结合参数进行数据库操作，往数据库中新增一个用户
  //1.用户名不存在，直接注册
  //2.用户存在，提示用户用户名已存在

  //判断用户名是否存在
  const isExist = await checkuseremailExist(ctx, useremail)
  if (isExist) {
    return ctx.throw({ code: 10001, message: '该用户名已存在' })
  }
  const passwordHash = await hash(password, 10)
  //数据库中插入一条数据
  const userColl = ctx.mongoClient.db().collection('User')
  const result = await userColl.insertOne({
    useremail,
    username,
    password,
    password: passwordHash,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return !!result.insertedId
  // console.log(result)
  // console.log(useremail, username, password)
}

async function generateCaptcha(ctx){
  //创建生成svg图片验证码
  const captcha = svgCaptcha.create()
  //console.log(captcha)

  //存入缓存验证码的表（数据库）
  const coll = ctx.mongoClient.db().collection('captcha')
  const result = await coll.insertOne({
    text:captcha.text,
    createdAt:new Date()//必须设置日期，用于进行验证码的过期处理
  })
  //将svg图片转换成base64
  const base64Svg = Base64.encode(captcha.data)
  return {
    key:result.insertedId,
    svg:`data:image/svg+xml;base64,${base64Svg}`
  }
}

async function doLogin(ctx,loginInfo){
  //const {useremail,password,captchaKey,captchaCode} = loginInfo
  const {useremail,password} = loginInfo
  //1.查询数据库，看是否由该验证码（没有=》提示过期）
  // const captColl = ctx.mongoClient.db().collection('captcha')
  // const captcha = await captColl.findOne({_id:new ObjectId(captchaKey) })
  // console.log(captcha)
  // if(!captcha){
  //   return ctx.throw({code:10002,message:'验证码已过期，请重新获取验证码'})
  // }
  // //2.有验证码，对比验证码是否正确（忽略大小写）
  // if (captcha.text.toUpperCase() !== captchaCode.toUpperCase()) {
  //   return ctx.throw({ code: 10003, message: '验证码不正确, 请重新获取验证码'})
  // }
  // 3. 根据账号名, 查找用户, 对比密码
  const userColl = ctx.mongoClient.db().collection('User')
  const userObj = await userColl.findOne({ useremail })
  if (!userObj) {
    return ctx.throw({ code: 10004, message: '用户名不正确' })
  }
  // 对比密码 password  userObj.password
  const isValidPassword = await compare(password, userObj.password)
  if (!isValidPassword) {
    return ctx.throw({ code: 10005, message: '密码不正确' })
  }
  //4.生成jwt token
  const token = jwt.sign({
    sub: userObj._id.toString(), // id
    useremail
  }, config.jwt.secret, {
    expiresIn: '36000s' // token过期时间 10个小时
  }) 
  //返回token信息
  return token
  
}

async function doLoginName(ctx,loginInfo){
  const {useremail} = loginInfo
  const userColl = ctx.mongoClient.db().collection('User')
  const userObj = await userColl.findOne({ useremail })
  return userObj.username
}

module.exports = {
  doRegister,
  generateCaptcha,
  doLogin,
  doLoginName
}
