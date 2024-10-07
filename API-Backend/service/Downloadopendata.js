//const { ObjectId } = require('mongodb')
async function getDownloadopendata(ctx,name) {
  const DownloadopendataColl = ctx.mongoClient.db().collection(`${name}`)
  //const DownloadopendataColl = ctx.mongoClient.db().collection('bridge_visualization')
  return DownloadopendataColl.find().toArray()
}
module.exports = {
  getDownloadopendata
}