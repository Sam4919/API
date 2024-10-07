async function ApiList(ctx, username) {
  const APIListColl = ctx.mongoClient.db().collection("API List")
  const result = await APIListColl.find({ username }).toArray()

  const extractedInfo = result.map((doc) => {
    let params = JSON.stringify(doc.Params)
    //返回的参数的样子有待修改
    if (doc.methods === "Post") {
      params = params.replace('{"key":"_id","type":"object"},', "")
      params = params.replace(',{"key":"type","type":"string"}', "")
      return {
        API: doc.API,
        methods: doc.methods,
        params: params,
        Status: doc.Status,
      }
    } else if (doc.methods === "Put") {
      params = params.replace(',{"key":"type","type":"string"}', "")
      return {
        API: doc.API,
        methods: doc.methods,
        params: params,
        Status: doc.Status,
      }
    }

    return {
      API: doc.API,
      methods: doc.methods,
      params: params,
      Status: doc.Status,
    }
  })
  return extractedInfo
}
module.exports = {
  ApiList,
}
