async function StatusChange(ctx, info) {
  console.log(info)
  const { API, methods, Status } = info
  console.log(API)
  const APIListColl = ctx.mongoClient.db().collection("API List")
  await APIListColl.updateOne(
    {
      API,
      methods,
    },
    { $set: { Status } }
  )
}
module.exports = {
  StatusChange,
}
