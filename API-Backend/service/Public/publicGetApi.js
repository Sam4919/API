async function GetApi(ctx) {
  // 使用 split 方法按 / 分割
  const parts = APIUrl.split("/")
  // 获取数组的最后一个元素
  const lastPart = parts[parts.length - 1]
  const dataColl = ctx.mongoClient.db().collection(`${lastPart}`)
  return dataColl.find().toArray()
}

module.exports = {
  GetApi,
}
