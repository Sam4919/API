async function dataDelete(ctx, info) {
  const { title, user } = info
  const dataListColl = ctx.mongoClient.db().collection("Opendata list")
  const APIListColl = ctx.mongoClient.db().collection("API List")
  await dataListColl.deleteOne({ title, user })
  await APIListColl.deleteMany({ title, username: user })
}
module.exports = {
  dataDelete,
}
