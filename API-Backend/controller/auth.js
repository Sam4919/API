const {doRegister,generateCaptcha,doLogin,doLoginName} = require('../service/auth')

module.exports = {
  async register(ctx){
    //校验参数
    ctx.verifyParams({
      useremail:'string',
      username:'string',
      password:'string'
    })

    //封装一个service 统一处理逻辑
    await doRegister(ctx,ctx.request.body)

    ctx.body={
      code:0,
      msg:'注册成功',
      data:true
    }
  },

  async captcha(ctx){
    //生成验证码,并且将验证码存入数据库
    const result = await generateCaptcha(ctx)
    //返回成功数据
    ctx.body = {
      code:0,
      message:'获取验证码成功',
      data:result
    }
  },

  async login(ctx){
    //校验参数
    ctx.verifyParams({
      useremail:'string',
      password:'string'
      // captchaKey:"string",
      // captchaCode:"string"
    })

    //进行登陆操作，获取jwt token
    const token =await doLogin(ctx,ctx.request.body)
    const username = await doLoginName(ctx,ctx.request.body)

    ctx.body = {
      code:0,
      message:'登陆成功',
      data:{token,username}
    }
  }
}