const { ObjectId } = require('mongodb')
async function listData(ctx) {
  const usernumberColl = ctx.mongoClient.db().collection('Usernumber')
  return usernumberColl.find().toArray()
}
async function add(ctx,id,listdataInfo) {
  let { usernumbers } = listdataInfo
  const usernumberColl = ctx.mongoClient.db().collection('Usernumber')
  await usernumberColl.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        usernumbers
      },
    }
  )
}
// async function add(ctx) {
  
//   const usernumberColl = ctx.mongoClient.db().collection('Usernumber')
//   await usernumberColl.updateOne(
//     usernumbers +=1
//   )
// }
async function reduce(ctx,id,listdataInfo) {
  const { usernumbers } = listdataInfo
  const usernumberColl = ctx.mongoClient.db().collection('Usernumber').findOne({ _id: new ObjectId(id) })
  console.log(use)
  if(usernumbers>0){
    await usernumberColl.updateOne(
      usernumbers -=1
     )
  }
}

async function userLoginData(ctx){
  const userLoginNumberColl = ctx.mongoClient.db().collection('User')
  return userLoginNumberColl.find().toArray()
}

module.exports = {
  listData,
  add,
  reduce,
  userLoginData
}