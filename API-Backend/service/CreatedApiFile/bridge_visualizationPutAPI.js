const username = "Matthewsu" 
const APIUrl = "http://133.62.160.122:4001/api/bridge_visualization" 
const methods = 'Put' 
const { ObjectId } = require("mongodb")
async function PutApi(ctx, info) {
  const { Params } = info
  const { _id, ...updateParams } = Params
  const parts = APIUrl.split("/")
  const lastPart = parts[parts.length - 1]
  const dataColl = ctx.mongoClient.db().collection(`${lastPart}`)
  await dataColl.updateOne(
    {
      _id: new ObjectId(_id),
    },
    {
      $set: updateParams,
    }
  )
}

module.exports = {
  PutApi,
}
