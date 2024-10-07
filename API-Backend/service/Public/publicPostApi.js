async function PostApi(ctx, info) {
  const { Params, ...otherParams } = info
  const parts = APIUrl.split("/")
  const lastPart = parts[parts.length - 1]
  const dataColl = ctx.mongoClient.db().collection(`${lastPart}`)
  await dataColl.insertOne(Params)
}

module.exports = {
  PostApi,
}
