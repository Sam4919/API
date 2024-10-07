const koa = require('koa')
const os = require('os')
const { koaBody } = require('koa-body')
const router = require('./router')
const mongoMiddleware = require('./middleware/mongodb')
const koaStatic = require('koa-static') //导入处理静态资源-托管中间件
const koaCors = require('@koa/cors') // 导入 CORS 中间件
const koaError = require('koa-json-error') // 导入错误处理中间件
const koaParameter = require('koa-parameter') //导入参数校验的中间件
const koaJwt = require('koa-jwt') //导入处理token解析的中间件
const config = require('./config/config.default') //导入配置文件

const app = new koa()

// 中间件：请求参数校验
koaParameter(app)
// 中间件：CORS 跨域
app.use(koaCors())
//中间件：静态资源服务
app.use(koaStatic('./static'))

//中间件：请求体参数处理
app.use(
  koaBody({
    // 支持文件上传
    multipart: true,
    // 文件上传配置
    formidable: {
      // 上传文件保存目录
      uploadDir: './static/uploads',
      // 保留上传文件原来的后缀名
      keepExtensions: true,
    },
  })
)

// 中间件：统一错误处理和错误信息输出
app.use(
  koaError({
    // 自定义出错时，接口返回数据的格式
    format: (err, obj) => {
      // 参数校验的错误
      if (obj.code === 'INVALID_PARAM') {
        // 企业开发中基于安全考虑，对于参数校验错误，后端无需告知前端更多错误细节
        // （即只需告诉前端参数不合法即可）
        return {
          code: 40022,
          message: '存在不合法参数！',
        }
      }
      // 其他类型的错误
      return {
        code: obj.code || 50000,
        message: obj.message || err.message,
      }
    },
  })
)

//中间件：mongodb数据库操作辅助（将mongoClient挂到ctx上）
app.use(mongoMiddleware())

//中间件：接口鉴权
app.use(
  koaJwt({
    secret: config.jwt.secret, // JWT 密钥
  }).unless({
    // 所有以 /api/user 开头的都要鉴权, /api/ 后面只要不是 user, 就要排除掉
    path: [/^\/api\/(?!user)/], // ?! 零宽度负预测先行断言  不是user的
  })
)

//中间件：路由
app.use(router.routes())
app.use(router.allowedMethods()) //便于提示，请求错误会有比较友好的提示

app.listen(4001, () => console.log('http://54.92.19.28:8080/'))
//app.listen(8000,'13.115.168.60',()=>console.log('http://13.115.168.60'))s
