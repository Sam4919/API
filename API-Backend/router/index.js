const Router = require("@koa/router")

//导入controller控制器
const homeCtrl = require("../controller/home")
const authCtrl = require("../controller/auth")
const categoryCtrl = require("../controller/categories")
const uploadCtrl = require("../controller/upload")
const profileCtrl = require("../controller/profile")
const blogCtrl = require("../controller/blog")
const masterdataCtrl = require("../controller/masterdata")
const recorddataCtrl = require("../controller/recorddata")
const usernumberCtrl = require("../controller/usernumber")
const OpenDataListCtrl = require("../controller/OpenDataList")
const DownloadopendataCtrl = require("../controller/Downloadopendata")
const UploadopendataCtrl = require("../controller/Uploadopendata")
const ApiCreateCtrl = require("../controller/ApiCreate")
const ApiListCtrl = require("../controller/ApiList")
const ApiOperationCtrl = require("../controller/ApiOperation")
const PersonalOpendatalistCtrl = require("../controller/personalOpendatalist")
const dataStatusCtrl = require("../controller/dataStatus")
const apiStatusCtrl = require("../controller/apiStatus")
const apiDeleteCtrl = require("../controller/apiDelete")
const dataDeleteCtrl = require("../controller/dataDelete")

const router = new Router()

router.get("/api/test", homeCtrl.test)
router.get("/api/user/test", homeCtrl.test2)

//注册登陆模块
router.post("/api/register", authCtrl.register)
router.get("/api/captcha", authCtrl.captcha)
router.post("/api/login", authCtrl.login)

//通用接口模块
router.get("/api/categories", categoryCtrl.list)
router.post("/api/user/image/upload", uploadCtrl.uploadImage)

//个人信息模块
router.get("/api/user/profile", profileCtrl.getProfile)
router.put("/api/user/profile/baseinfo", profileCtrl.updateProfileBaseInfo)
router.put("/api/user/profile/password", profileCtrl.updateProfilePassword)
router.put("/api/user/profile/avatar", profileCtrl.updateProfileAvatar)

//公共博客展示页模块
router.get("/api/articles", blogCtrl.listArticlesByCategory)
router.get("/api/articles/:id", blogCtrl.getArticleDetail)

//数据模块
router.get("/api/masterdata", masterdataCtrl.listData)
router.get("/api/recorddata", recorddataCtrl.listData)
router.get("/api/recorddata/:id", recorddataCtrl.detail)
router.put("/api/recorddata/:id", recorddataCtrl.updata)

//用户数量模块
router.get("/api/number", usernumberCtrl.listData)
router.put("/api/number/add/:id", usernumberCtrl.add)
router.post("/api/number/reduce", usernumberCtrl.reduce)
router.get("/api/loginnumber", usernumberCtrl.userLoginData)

//opendatalist
router.get("/api/opendatalist", OpenDataListCtrl.getopendatalist)

router.get(
  "/api/downloadopendata/:id",
  DownloadopendataCtrl.getDownloadopendata
)

router.post("/api/uploadopensystem", UploadopendataCtrl.Uploadopensystem)
router.post("/api/uploadopendata", UploadopendataCtrl.Uploadopendata)

//api生成
router.post("/api/createGetApi", ApiCreateCtrl.createGetApi)
router.put("/api/createPutApi", ApiCreateCtrl.createPutApi)
router.put("/api/createPostApi", ApiCreateCtrl.createPostApi)
router.put("/api/createDeleteApi", ApiCreateCtrl.createDeleteApi)

//跟据api执行操作
router.put("/api/ApiOperation", ApiOperationCtrl.ApiOperation)

//用户保留的api列表
router.get("/api/apilist", ApiListCtrl.ApiList)
//用户个人数据列表
router.get(
  "/api/personalOpendatalist",
  PersonalOpendatalistCtrl.personalOpendatalist
)

//改变数据公开状态
router.put("/api/datastatus", dataStatusCtrl.StatusChange)
router.put("/api/apistatus", apiStatusCtrl.StatusChange)

//删除API
router.post("/api/apiDelete", apiDeleteCtrl.apiDelete)
//删除Data
router.post("/api/dataDelete", dataDeleteCtrl.dataDelete)

//路由实例导出
module.exports = router

const bridge_visualizationGetCtrl = require("../controller/CreatedApiFile/bridge_visualizationGetAPI")
router.get("/api/bridge_visualization", bridge_visualizationGetCtrl.GetApi)
const bridge_visualizationPutCtrl = require("../controller/CreatedApiFile/bridge_visualizationPutAPI")

router.put("/api/bridge_visualization", bridge_visualizationPutCtrl.PutApi)
const bridge_visualizationPostCtrl = require("../controller/CreatedApiFile/bridge_visualizationPostAPI")

router.post("/api/bridge_visualization", bridge_visualizationPostCtrl.PostApi)
const bridge_visualizationDeleteCtrl = require("../controller/CreatedApiFile/bridge_visualizationDeleteAPI")

router.delete(
  "/api/bridge_visualization/:id",
  bridge_visualizationDeleteCtrl.DeleteApi
)

const test003GetCtrl = require("../controller/CreatedApiFile/test003GetAPI")
router.get("/api/test003", test003GetCtrl.GetApi)
const test003PutCtrl = require("../controller/CreatedApiFile/test003PutAPI")

router.put("/api/test003", test003PutCtrl.PutApi)

const test005GetCtrl = require("../controller/CreatedApiFile/test005GetAPI")
router.get("/api/test005", test005GetCtrl.GetApi)
const test003PostCtrl = require("../controller/CreatedApiFile/test003PostAPI")

router.post("/api/test003", test003PostCtrl.PostApi)
const tunnel_visualizationGetCtrl = require("../controller/CreatedApiFile/tunnel_visualizationGetAPI")
router.get("/api/tunnel_visualization", tunnel_visualizationGetCtrl.GetApi)
const tunnel_visualizationPutCtrl = require("../controller/CreatedApiFile/tunnel_visualizationPutAPI")

router.put("/api/tunnel_visualization", tunnel_visualizationPutCtrl.PutApi)
const tunnel_visualizationPostCtrl = require("../controller/CreatedApiFile/tunnel_visualizationPostAPI")

router.post("/api/tunnel_visualization", tunnel_visualizationPostCtrl.PostApi)
const tunnel_visualizationDeleteCtrl = require("../controller/CreatedApiFile/tunnel_visualizationDeleteAPI")

router.delete(
  "/api/tunnel_visualization/:id",
  tunnel_visualizationDeleteCtrl.DeleteApi
)

 const bridge_visualization_2GetCtrl = require("../controller/CreatedApiFile/bridge_visualization_2GetAPI") 
 router.get("/api/bridge_visualization_2", bridge_visualization_2GetCtrl.GetApi)
 const bridge_visualization_2PutCtrl = require("../controller/CreatedApiFile/bridge_visualization_2PutAPI")
         
 router.put("/api/bridge_visualization_2", bridge_visualization_2PutCtrl.PutApi)
 const ceshi001GetCtrl = require("../controller/CreatedApiFile/ceshi001GetAPI") 
 router.get("/api/ceshi001", ceshi001GetCtrl.GetApi)
 const ceshi001PutCtrl = require("../controller/CreatedApiFile/ceshi001PutAPI")
         
 router.put("/api/ceshi001", ceshi001PutCtrl.PutApi)
 const ceshi001PostCtrl = require("../controller/CreatedApiFile/ceshi001PostAPI")
         
 router.post("/api/ceshi001", ceshi001PostCtrl.PostApi)
 const ceshi001DeleteCtrl = require("../controller/CreatedApiFile/ceshi001DeleteAPI")
         
 router.delete("/api/ceshi001/:id", ceshi001DeleteCtrl.DeleteApi)