//const { ObjectId } = require('mongodb')
async function listData(ctx){
  const masterdataColl = ctx.mongoClient.db().collection('masterdata')
  return masterdataColl.find().toArray()
}

module.exports = {
  listData
}