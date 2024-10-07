const username = "Matthewsu" 
const APIUrl = "http://133.62.160.122:4001/api/test003" 
const methods = 'Post' 
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
