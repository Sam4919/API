const {getAllCategories} = require('../service/categories')

module.exports= {
  async list(ctx){
    //获取所有分类
    const categories = await getAllCategories(ctx)
    console.log(categories)

    //处理成功响应
    ctx.body = {
      code:0,
      message:'获取分类成功',
      data: categories
    }
  }
}