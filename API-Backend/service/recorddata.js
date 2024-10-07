const { ObjectId } = require("mongodb");
async function listData(ctx) {
  const recorddataColl = ctx.mongoClient.db().collection("recorddata1");
  return recorddataColl.find().toArray();
}
async function getListDataById(ctx, id) {
  const recorddataColl = ctx.mongoClient.db().collection("recorddata1");
  return recorddataColl.findOne({ _id: new ObjectId(id) });
}
async function updataListData(ctx, id, listdataInfo) {
  //修改逻辑
  const { Date, Id, Inspector, Keisiki, Name, Pass, Rank, Road } = listdataInfo;
  const recorddataColl = ctx.mongoClient.db().collection("recorddata1");
  const result = await recorddataColl.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        Date,
        Id,
        Inspector,
        Keisiki,
        Name,
        //Pass,
        Rank,
        Road,
      },
    }
  );
  console.log(result);
}

module.exports = {
  listData,
  getListDataById,
  updataListData,
};
