async function StatusChange(ctx, info) {
  console.log(info)
  const { title, Status } = info
  console.log(title)
  const APIListColl = ctx.mongoClient.db().collection("Opendata list")
  await APIListColl.updateOne(
    {
      title,
    },
    { $set: { Status } }
  )
}
module.exports = {
  StatusChange,
}
