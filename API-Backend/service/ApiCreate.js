const os = require("os")
const fs = require("fs")
const path = require("path")

// function getCurrentIPAddress() {
//   const networkInterfaces = os.networkInterfaces()
//   const interfaces = Object.values(networkInterfaces).flat()
//   const ipv4Interfaces = interfaces.filter(
//     (iface) => iface.family === "IPv4" && !iface.internal
//   )

//   if (ipv4Interfaces.length > 0) {
//     return ipv4Interfaces[0].address // 返回第一个 IPv4 地址
//   } else {
//     return null // 没有找到 IPv4 地址时返回 null 或者其他适当的值
//   }
// }
//检查API是否已经存在
async function checkAPIExist(ctx, info) {
  const userColl = ctx.mongoClient.db().collection("API List")
  const { username, methods, API } = info
  const user = await userColl.findOne({ username, methods, API })
  return !!user
}
//给前端返回数据库的key的类型
async function typeofKey(ctx, title) {
  const collectionExists = await ctx.mongoClient
    .db()
    .listCollections({ name: title })
    .toArray()
  if (collectionExists.length > 0) {
    //const IPaddress = getCurrentIPAddress()
    const IPaddress = "3.113.22.241"
    const result = `http://${IPaddress}:4001/api/${title}`
    return result
  } else {
    return ctx.throw({
      code: 404,
      message: "this system has not already exist",
    }) // 或者返回一个适当的值，表示集合不存在
  }
}

//生成GetAPI
async function createGetApi(ctx, titleInfo) {
  const { user, title } = titleInfo
  const result = await typeofKey(ctx, title)
  // 原始文件路径
  const IndexFilePath = path.join(__dirname, "..", "router", "index.js")
  const originalControllerFilePath = path.join(
    __dirname,
    "..",
    "controller",
    "Public",
    "publicGetApi.js"
  )
  const originalServiveFilePath = path.join(__dirname, "Public/publicGetApi.js")

  const info = {
    username: user,
    methods: "Get",
    API: result,
  }
  const isExist = await checkAPIExist(ctx, info)
  if (isExist) {
    return ctx.throw({ code: 10001, message: "this API has already exist" })
  }

  const apilist = ctx.mongoClient.db().collection("API List")
  await apilist.insertOne({
    username: user,
    title,
    methods: "Get",
    API: result,
    Status: "Unpublic",
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  //生成controller文件
  fs.readFile(originalControllerFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file", err)
      return
    }
    const newFilePath = path.join(
      __dirname,
      "..",
      "controller",
      "CreatedApiFile",
      `${title}GetAPI.js`
    )

    const oldContent = `const { GetApi } = require("../service/Public/publicGetApi")`
    const newContent = `
      const path = require("path");
      const apiPath = path.join(__dirname, "..", "..", "service", "CreatedApiFile", "${title}GetAPI");
      const { GetApi } = require(apiPath);
      `
    // 进行内容替换，这里用 'oldContent' 替换为 'newContent'
    const updatedContent = data.replace(oldContent, newContent.trim())
    // 将更新后的内容写回到文件中
    fs.writeFile(newFilePath, updatedContent, "utf8", (err) => {
      if (err) {
        console.error("Error writing the file:", err)
      } else {
        console.log("File updated successfully.")
      }
    })
  })

  //生成service文件
  fs.readFile(originalServiveFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file", err)
      return
    }
    // 新文件路径
    const newFilePath = path.join(
      __dirname,
      "CreatedApiFile",
      `${title}GetAPI.js`
    )
    const addUser = `const username = "${user}" \n`
    const additionalContent = `const APIUrl = "${result}" \n`
    const addmethods = "const methods = 'Get' \n"
    // 更新文件内容（示例：在文件内容后追加新内容）
    const updatedContent = addUser + additionalContent + addmethods + data
    // 将更新后的内容写入新文件
    fs.writeFile(newFilePath, updatedContent, (err) => {
      if (err) {
        console.error("Error writing the file", err)
      } else {
        console.log("File updated and saved successfully as", newFilePath)
      }
    })
  })

  //更新index.js文件
  // 读取文件内容
  fs.readFile(IndexFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file", err)
      return
    }
    // 更新文件内容
    const updatedContent =
      data +
      `\n const ${title}GetCtrl = require("../controller/CreatedApiFile/${title}GetAPI") \n router.get("/api/${title}", ${title}GetCtrl.GetApi)`
    // 异步写入
    // 将更新后的内容写入新文件
    fs.writeFile(IndexFilePath, updatedContent, (err) => {
      if (err) {
        console.error("Error writing the file", err)
      } else {
        console.log("File updated and saved successfully as", IndexFilePath)
      }
    })
  })

  return result
}

//生成PutAPI
async function createPutApi(ctx, titleInfo) {
  const { user, title } = titleInfo
  const resultparams = await ctx.mongoClient
    .db()
    .collection(`${title}`)
    .find()
    .toArray()

  putApiParams = Object.keys(resultparams[0]).map((key) => {
    let type = typeof resultparams[0][key]
    // 检查数组类型
    if (Array.isArray(resultparams[0][key])) {
      type = "array"
    }
    // 检查null类型
    if (resultparams[0][key] === null) {
      type = "null"
    }
    return { key: key, type: type }
  })
  const resultUrl = await typeofKey(ctx, title)

  // 原始文件路径
  const IndexFilePath = path.join(__dirname, "..", "router", "index.js")
  const originalControllerFilePath = path.join(
    __dirname,
    "..",
    "controller",
    "Public",
    "publicPutApi.js"
  )
  const originalServiveFilePath = path.join(__dirname, "Public/publicPutApi.js")

  const info = {
    username: user,
    methods: "Put",
    API: resultUrl,
  }
  const isExist = await checkAPIExist(ctx, info)
  if (isExist) {
    return ctx.throw({ code: 10001, message: "this API has already exist" })
  }

  const apilist = ctx.mongoClient.db().collection("API List")
  await apilist.insertOne({
    username: user,
    title,
    methods: "Put",
    API: resultUrl,
    Params: putApiParams,
    Status: "Unpublic",
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  //生成controller文件
  fs.readFile(originalControllerFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file", err)
      return
    }
    const newFilePath = path.join(
      __dirname,
      "..",
      "controller",
      "CreatedApiFile",
      `${title}PutAPI.js`
    )

    const oldContent = `const { PutApi } = require("../service/Public/publicPutApi")`
    const newContent = `
      const path = require("path");
      const apiPath = path.join(__dirname, "..", "..", "service", "CreatedApiFile", "${title}PutAPI");
      const { PutApi } = require(apiPath);
      `
    // 进行内容替换，这里用 'oldContent' 替换为 'newContent'
    const updatedContent = data.replace(oldContent, newContent.trim())
    // 将更新后的内容写回到文件中
    fs.writeFile(newFilePath, updatedContent, "utf8", (err) => {
      if (err) {
        console.error("Error writing the file:", err)
      } else {
        console.log("File updated successfully.")
      }
    })
  })

  //生成service文件
  fs.readFile(originalServiveFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file", err)
      return
    }
    // 新文件路径
    const newFilePath = path.join(
      __dirname,
      "CreatedApiFile",
      `${title}PutAPI.js`
    )
    const addUser = `const username = "${user}" \n`
    const additionalContent = `const APIUrl = "${resultUrl}" \n`
    const addmethods = "const methods = 'Put' \n"
    // 更新文件内容（示例：在文件内容后追加新内容）
    const updatedContent = addUser + additionalContent + addmethods + data
    // 将更新后的内容写入新文件
    fs.writeFile(newFilePath, updatedContent, (err) => {
      if (err) {
        console.error("Error writing the file", err)
      } else {
        console.log("File updated and saved successfully as", newFilePath)
      }
    })
  })

  //更新index.js文件
  // 读取文件内容
  fs.readFile(IndexFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file", err)
      return
    }
    // 更新文件内容
    const updatedContent =
      data +
      `\n const ${title}PutCtrl = require("../controller/CreatedApiFile/${title}PutAPI")
         \n router.put("/api/${title}", ${title}PutCtrl.PutApi)`
    // 异步写入
    // 将更新后的内容写入新文件
    fs.writeFile(IndexFilePath, updatedContent, (err) => {
      if (err) {
        console.error("Error writing the file", err)
      } else {
        console.log("File updated and saved successfully as", IndexFilePath)
      }
    })
  })
  return { resultUrl, putApiParams }
}

//生成DeleteAPI
async function createDeleteApi(ctx, titleInfo) {
  const { user, title } = titleInfo
  const resultparams = await ctx.mongoClient
    .db()
    .collection(`${title}`)
    .find()
    .toArray()

  deleteApiParams = Object.keys(resultparams[0]).map((key) => {
    let type = typeof resultparams[0][key]
    // 检查数组类型
    if (Array.isArray(resultparams[0][key])) {
      type = "array"
    }
    // 检查null类型
    if (resultparams[0][key] === null) {
      type = "null"
    }
    return { key: key, type: type }
  })
  console.log(deleteApiParams[0])
  const resultUrl = await typeofKey(ctx, title)

  // 原始文件路径
  const IndexFilePath = path.join(__dirname, "..", "router", "index.js")
  const originalControllerFilePath = path.join(
    __dirname,
    "..",
    "controller",
    "Public",
    "publicDeleteApi.js"
  )
  const originalServiveFilePath = path.join(
    __dirname,
    "Public/publicDeleteApi.js"
  )

  const info = {
    username: user,
    methods: "Delete",
    API: resultUrl,
  }
  const isExist = await checkAPIExist(ctx, info)
  if (isExist) {
    return ctx.throw({ code: 10001, message: "this API has already exist" })
  }

  const apilist = ctx.mongoClient.db().collection("API List")
  await apilist.insertOne({
    username: user,
    title,
    methods: "Delete",
    API: resultUrl,
    Params: deleteApiParams[0],
    Status: "Unpublic",
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  //生成controller文件
  fs.readFile(originalControllerFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file", err)
      return
    }
    const newFilePath = path.join(
      __dirname,
      "..",
      "controller",
      "CreatedApiFile",
      `${title}DeleteAPI.js`
    )

    const oldContent = `const { DeleteApi } = require("../service/Public/publicDeleteApi")`
    const newContent = `
      const path = require("path");
      const apiPath = path.join(__dirname, "..", "..", "service", "CreatedApiFile", "${title}DeleteAPI");
      const { DeleteApi } = require(apiPath);
      `
    // 进行内容替换，这里用 'oldContent' 替换为 'newContent'
    const updatedContent = data.replace(oldContent, newContent.trim())
    // 将更新后的内容写回到文件中
    fs.writeFile(newFilePath, updatedContent, "utf8", (err) => {
      if (err) {
        console.error("Error writing the file:", err)
      } else {
        console.log("File updated successfully.")
      }
    })
  })

  //生成service文件
  fs.readFile(originalServiveFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file", err)
      return
    }
    // 新文件路径
    const newFilePath = path.join(
      __dirname,
      "CreatedApiFile",
      `${title}DeleteAPI.js`
    )
    const addUser = `const username = "${user}" \n`
    const additionalContent = `const APIUrl = "${resultUrl}" \n`
    const addmethods = "const methods = 'Delete' \n"
    // 更新文件内容（示例：在文件内容后追加新内容）
    const updatedContent = addUser + additionalContent + addmethods + data
    // 将更新后的内容写入新文件
    fs.writeFile(newFilePath, updatedContent, (err) => {
      if (err) {
        console.error("Error writing the file", err)
      } else {
        console.log("File updated and saved successfully as", newFilePath)
      }
    })
  })

  //更新index.js文件
  // 读取文件内容
  fs.readFile(IndexFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file", err)
      return
    }
    // 更新文件内容
    const updatedContent =
      data +
      `\n const ${title}DeleteCtrl = require("../controller/CreatedApiFile/${title}DeleteAPI")
         \n router.delete("/api/${title}/:id", ${title}DeleteCtrl.DeleteApi)`
    // 异步写入
    // 将更新后的内容写入新文件
    fs.writeFile(IndexFilePath, updatedContent, (err) => {
      if (err) {
        console.error("Error writing the file", err)
      } else {
        console.log("File updated and saved successfully as", IndexFilePath)
      }
    })
  })

  return { resultUrl, deleteApiParams }
}

//生成PostAPI
async function createPostApi(ctx, titleInfo) {
  const { user, title } = titleInfo
  const resultparams = await ctx.mongoClient
    .db()
    .collection(`${title}`)
    .find()
    .toArray()

  postApiParams = Object.keys(resultparams[0]).map((key) => {
    let type = typeof resultparams[0][key]
    // 检查数组类型
    if (Array.isArray(resultparams[0][key])) {
      type = "array"
    }
    // 检查null类型
    if (resultparams[0][key] === null) {
      type = "null"
    }
    return { key: key, type: type }
  })
  console.log(postApiParams)
  const resultUrl = await typeofKey(ctx, title)

  // 原始文件路径
  const IndexFilePath = path.join(__dirname, "..", "router", "index.js")
  const originalControllerFilePath = path.join(
    __dirname,
    "..",
    "controller",
    "Public",
    "publicPostApi.js"
  )
  const originalServiveFilePath = path.join(
    __dirname,
    "Public/publicPostApi.js"
  )

  const info = {
    username: user,
    methods: "Post",
    API: resultUrl,
  }
  const isExist = await checkAPIExist(ctx, info)
  if (isExist) {
    return ctx.throw({ code: 10001, message: "this API has already exist" })
  }

  const apilist = ctx.mongoClient.db().collection("API List")
  await apilist.insertOne({
    username: user,
    title,
    methods: "Post",
    API: resultUrl,
    Params: postApiParams,
    Status: "Unpublic",
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  //生成controller文件
  fs.readFile(originalControllerFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file", err)
      return
    }
    const newFilePath = path.join(
      __dirname,
      "..",
      "controller",
      "CreatedApiFile",
      `${title}PostAPI.js`
    )

    const oldContent = `const { PostApi } = require("../service/Public/publicPostApi")`
    const newContent = `
      const path = require("path");
      const apiPath = path.join(__dirname, "..", "..", "service", "CreatedApiFile", "${title}PostAPI");
      const { PostApi } = require(apiPath);
      `
    // 进行内容替换，这里用 'oldContent' 替换为 'newContent'
    const updatedContent = data.replace(oldContent, newContent.trim())
    // 将更新后的内容写回到文件中
    fs.writeFile(newFilePath, updatedContent, "utf8", (err) => {
      if (err) {
        console.error("Error writing the file:", err)
      } else {
        console.log("File updated successfully.")
      }
    })
  })

  //生成service文件
  fs.readFile(originalServiveFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file", err)
      return
    }
    // 新文件路径
    const newFilePath = path.join(
      __dirname,
      "CreatedApiFile",
      `${title}PostAPI.js`
    )
    const addUser = `const username = "${user}" \n`
    const additionalContent = `const APIUrl = "${resultUrl}" \n`
    const addmethods = "const methods = 'Post' \n"
    // 更新文件内容（示例：在文件内容后追加新内容）
    const updatedContent = addUser + additionalContent + addmethods + data
    // 将更新后的内容写入新文件
    fs.writeFile(newFilePath, updatedContent, (err) => {
      if (err) {
        console.error("Error writing the file", err)
      } else {
        console.log("File updated and saved successfully as", newFilePath)
      }
    })
  })

  //更新index.js文件
  // 读取文件内容
  fs.readFile(IndexFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file", err)
      return
    }
    // 更新文件内容
    const updatedContent =
      data +
      `\n const ${title}PostCtrl = require("../controller/CreatedApiFile/${title}PostAPI")
         \n router.post("/api/${title}", ${title}PostCtrl.PostApi)`
    // 异步写入
    // 将更新后的内容写入新文件
    fs.writeFile(IndexFilePath, updatedContent, (err) => {
      if (err) {
        console.error("Error writing the file", err)
      } else {
        console.log("File updated and saved successfully as", IndexFilePath)
      }
    })
  })

  return { resultUrl, postApiParams }
}

module.exports = {
  createGetApi,
  createPutApi,
  createPostApi,
  createDeleteApi,
}
