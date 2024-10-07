async function checkTitleExist(ctx, title) {
  const userColl = ctx.mongoClient.db().collection("Opendata list")
  const user = await userColl.findOne({ title })
  return !!user
}

//3.系统时直接向list里添加
async function Uploadopensystem(ctx, systemInfo) {
  const { user, title, content, category, systemURL, ManualURL } = systemInfo
  const isExist = await checkTitleExist(ctx, title)
  if (isExist) {
    return ctx.throw({ code: 10001, message: "this system has already exist" })
  }
  const userColl = ctx.mongoClient.db().collection("Opendata list")
  const result = await userColl.insertOne({
    user,
    title,
    content,
    category,
    systemURL,
    ManualURL,
    Status: "Unpublic",
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return !!result.insertedId
}

//4.数据时创建数据的集合并向列表添加
async function Uploadopendata(ctx, dataInfo) {
  const { user, title, content, category, fileGenre, JSON } = dataInfo
  const isExist = await checkTitleExist(ctx, title)
  if (isExist) {
    return ctx.throw({ code: 10001, message: "this data has already exist" })
  }
  const coll = ctx.mongoClient.db().collection(`${title}`)
  await coll.insertMany(JSON)

  const userColl = ctx.mongoClient.db().collection("Opendata list")
  const result = await userColl.insertOne({
    user,
    title,
    content,
    category,
    fileGenre,
    Status: "Unpublic",
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  console.log(result)
}

module.exports = {
  Uploadopensystem,
  Uploadopendata,
  checkTitleExist,
}
