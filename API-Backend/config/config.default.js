//数据库相关的配置 token认证相关配置
const config = {
  //mongodb相关配置
  mongodb:{
    uri:"mongodb+srv://apikaylab:klab0807@cluster0.qjulket.mongodb.net/Firstdb",
    options:{
      useUnifiedTopology:true,
      useNewUrlParser:true,
      authSource:'admin'
    }
  },

  //token相关配置
  jwt:{
    secret:'my-blog-secret'
  }
}

//导出
module.exports = config