const username = "Matthewsu" 
const APIUrl = "http://18.183.61.7:4001/api/bridge_visualization_2" 
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
