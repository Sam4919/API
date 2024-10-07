const { ObjectId } = require("mongodb")
async function DeleteApi(ctx, Id) {
  const parts = APIUrl.split("/")
  const lastPart = parts[parts.length - 1]
  const dataColl = ctx.mongoClient.db().collection(`${lastPart}`)
  await dataColl.deleteOne({
    _id: new ObjectId(Id),
  })
}

module.exports = {
  DeleteApi,
}
