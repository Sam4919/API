async function apiDelete(ctx, info) {
  const { API, methods, username } = info
  console.log(API)
  const APIListColl = ctx.mongoClient.db().collection("API List")
  await APIListColl.deleteOne({ API, methods, username })
}
module.exports = {
  apiDelete,
}
