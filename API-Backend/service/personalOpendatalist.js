async function personalOpendatalist(ctx, username) {
  const APIListColl = ctx.mongoClient.db().collection("Opendata list")
  const result = await APIListColl.find({ user: username }).toArray()
  console.log(result)
  //   const extractedInfo = result.map((doc) => {
  //     return {
  //       API: doc.API,
  //       methods: doc.methods,
  //     }
  //   })
  return result
}
module.exports = {
  personalOpendatalist,
}
