const username = "Matthewsu" 
const APIUrl = "http://18.183.61.7:4001/api/tunnel_visualization" 
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
