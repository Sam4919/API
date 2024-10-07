import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import App from "./App.vue"
import http from "./axios"
import { createPinia } from "pinia"

import Main from "./components/MainPage.vue"
//import GetJson from "./components/GetJson.vue";
import UserLogin from "./components/UserLogin.vue"
import UserSignup from "./components/UserSignup.vue"
import OpenDataUpload from "./components/OpenDataUpload.vue"
import OpenDataCatalog from "./components/OpenDataCatalog.vue"

// import OpenDataCatalog from "./components/OpenDataCatalog.vue";
import UserInfo from "./components/UserInfo.vue"

//const history = require("connect-history-api-fallback");
//app.use(history());

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/main" },
    { path: "/main", component: Main },
    //{ path: "/getjson", component: GetJson },
    { path: "/userlogin", component: UserLogin },
    { path: "/usersignup", component: UserSignup },
    { path: "/opendataupload", component: OpenDataUpload },

    { path: "/opendatacatalog", component: OpenDataCatalog },
    // { path: "/opendatacatalog", component: OpenDataCatalog},
    { path: "/userinfo", component: UserInfo },
  ],
})

// // 监听浏览器关闭事件
// window.addEventListener("beforeunload", () => {
//   localStorage.removeItem("Token");
//   localStorage.removeItem("username");
// });

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
//app.use.config.productionTip = false
app.config.globalProperties.$http = http

app.mount("#app")
app.use(ElementPlus)
