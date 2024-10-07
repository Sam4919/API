module.exports = {
  async uploadImage (ctx) {
    //解析上传的文件信息
    const file = ctx.request.files.file
    //去除路径前面的static前缀
    const location =file.path.replace('static','')
    
    //返回成功数据
    ctx.body ={
      code:0,
      message:'上传成功',
      data:{
        location
      }
    }
  }
}