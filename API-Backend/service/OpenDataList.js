async function getopendatalist(ctx) {
  const recorddataColl = ctx.mongoClient.db().collection("Opendata list")
  const apilistColl = ctx.mongoClient.db().collection("API List")

  const result = await recorddataColl
    .aggregate([
      // {
      //   $match: { Status: "public" }, // 过滤条件，例如只选择状态为公开的数据
      // },
      // {
      //   $lookup: {
      //     from: "API List", // 目标集合名称
      //     localField: "title", // 本集合中的字段，关联到 API List 的字段
      //     foreignField: "title", // 目标集合中的字段
      //     as: "ApiInfo", // 返回的字段名称，存放关联的 API List 数据数组
      //   },
      // },
      // {
      //   $unwind: {
      //     path: "$ApiInfo",
      //     preserveNullAndEmptyArrays: true, // 保留没有匹配记录的文档
      //   },
      // },
      // {
      //   $match: {
      //     $or: [
      //       { "ApiInfo.Status": { $exists: false } }, // 如果没有关联数据，也返回
      //       { "ApiInfo.Status": "public" }, // 过滤关联的 API List 中的状态为 public 的文档
      //     ],
      //   }, // 过滤关联的 API List 中的状态为 public 的文档
      // },
      // {
      //   $group: {
      //     _id: "$_id", // 使用当前文档的 _id 作为分组的依据
      //     title: { $first: "$title" },
      //     content: { $first: "$content" },
      //     filegenre: { $first: "$filegenre" },
      //     category: { $first: "$category" },
      //     user: { $first: "$user" },
      //     Status: { $first: "$Status" },
      //     ApiInfo: { $push: "$ApiInfo" }, // 将多个匹配的文档组合为数组
      //   },
      // },
      // {
      //   $project: {
      //     _id: 1,
      //     title: 1,
      //     content: 1,
      //     filegenre: 1,
      //     category: 1,
      //     user: 1,
      //     Status: 1,
      //     ApiInfo: 1, // 保留关联的 API List 数据数组
      //   },
      // },
      {
        $match: { Status: "public" }, // 过滤条件，例如只选择状态为公开的数据
      },
      {
        $lookup: {
          from: "API List", // 目标集合名称
          localField: "title", // 本集合中的字段，关联到 API List 的字段
          foreignField: "title", // 目标集合中的字段
          as: "ApiInfo", // 返回的字段名称，存放关联的 API List 数据数组
        },
      },
      {
        $addFields: {
          ApiInfo: {
            $cond: {
              if: {
                $and: [
                  { $isArray: "$ApiInfo" }, // 检查 ApiInfo 是否为数组
                  { $ne: [{ $size: "$ApiInfo" }, 0] }, // 检查 ApiInfo 数组不为空
                ],
              },
              then: {
                $filter: {
                  input: "$ApiInfo",
                  as: "api",
                  cond: {
                    $eq: ["$$api.Status", "public"], // 只保留 Status 为 "public" 的数据
                  },
                },
              },
              else: [], // 如果 ApiInfo 不是数组或为空，则返回空数组
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id", // 使用当前文档的 _id 作为分组的依据
          title: { $first: "$title" },
          content: { $first: "$content" },
          filegenre: { $first: "$filegenre" },
          category: { $first: "$category" },
          user: { $first: "$user" },
          Status: { $first: "$Status" },
          ApiInfo: { $push: "$ApiInfo" }, // 将多个匹配的文档组合为数组
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          content: 1,
          filegenre: 1,
          category: 1,
          user: 1,
          Status: 1,
          ApiInfo: {
            $cond: {
              if: {
                $and: [
                  { $isArray: "$ApiInfo" }, // 检查 ApiInfo 是否为数组
                  { $ne: [{ $size: "$ApiInfo" }, 0] }, // 检查 ApiInfo 数组不为空
                ],
              },
              then: { $arrayElemAt: ["$ApiInfo", 0] }, // 返回数组中的第一个元素
              else: "$$REMOVE", // 如果 ApiInfo 不是数组或为空，则移除 ApiInfo 字段
            },
          },
        },
      },
    ])
    .toArray()
  console.log(result) // 打印结果用于调试
  return result
  //return recorddataColl.find({ Status: "public" }).toArray()
}

module.exports = {
  getopendatalist,
}
