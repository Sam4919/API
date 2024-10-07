async function getAllCategories(ctx){
  //查询数据库，拿到categories表的所有数据
  const coll = ctx.mongoClient.db().collection('categories')
  return coll.find().toArray()
}

module.exports = {
  getAllCategories
}