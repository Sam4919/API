import { defineStore } from "pinia"
import axios from "axios"

const address = axios.create({
  baseURL: "http://localhost:4001",
})

export const useUserStore = defineStore("user", {
  state: () => ({
    useremail: "",
    username: localStorage.getItem("username") || "ログイン前",
    password: "",
    //captchaKey:'',
    //captchaCode:'',
    userLogged: localStorage.getItem("Token") || false,
    // response: null,
    uploadRes: "送信前です．",
    opendataList: null,
    opendataTarget: "",
    opendataTargetResult: [],
    apiResult: "",
    apiKeyList: null,
    times: 0,
    loginpersons: 0,
    persons: 0,
  }),

  actions: {
    async getUserLoginNumber() {
      try {
        const res = await address.get("/api/loginnumber")
        this.loginpersons = res.data.data.length
      } catch (error) {
        console.error(error)
      }
    },
    async getUsernumber() {
      try {
        const res = await address.get("/api/number")
        this.persons = +res.data.data[0].usernumbers
      } catch (error) {
        console.error(error)
      }
    },

    async signUp(useremail, username, password) {
      try {
        await address.post(
          "/api/register",
          JSON.stringify({ useremail, username, password }),
          { headers: { "Content-Type": "application/json" } }
        )
      } catch (error) {
        console.error(error)
      }
    },

    // async captchacode() {
    //   return await axios.get('http://localhost:3000/api/capcha')
    // },

    //async signIn(useremail, password,captchaKey,captchaCode) {
    async signIn(useremail, password) {
      try {
        const res = await address.post(
          "/api/login",
          { useremail, password },
          { headers: { "Content-Type": "application/json" } }
        )
        localStorage.setItem("Token", res.data.data.token)
        if (res.data.data.token) this.userLogged = true
        this.username = res.data.data.username
        localStorage.setItem("username", res.data.data.username)
      } catch (error) {
        console.error(error)
      }
      const body = {
        _id: "65a8ce58c976ebf9d99f27cb",
        usernumbers: this.persons + 1,
      }
      await address.put(`/api/number/add/${body._id}`, body, {
        headers: {
          "Content-Type": "application/json", // 指定请求体的数据类型为 JSON
          // 可以添加其他必要的请求头，如认证信息等
        },
      })
    },

    async logout() {
      console.log("this.persons:", this.persons)
      if (this.persons > 0) {
        const body = {
          _id: "65a8ce58c976ebf9d99f27cb",
          usernumbers: this.persons - 1,
        }
        await address.put(`/api/number/add/${body._id}`, body, {
          headers: {
            "Content-Type": "application/json", // 指定请求体的数据类型为 JSON
            // 可以添加其他必要的请求头，如认证信息等
          },
        })
        console.log("ok")
        try {
          localStorage.clear()
          this.username = "ログイン前"
          this.userLogged = false
          // const user = 'ログイン前'
          // this.username = user
          // this.userLogged = false
          this.times = 0
          this.persons = 0
        } catch (error) {
          console.error(error)
        }
      }
    },

    async setOpendataTarget(target) {
      try {
        const opendataTarget = target
        this.opendataTarget = opendataTarget
      } catch (error) {
        console.error(error)
      }
    },

    async getOpendataList() {
      try {
        const res = await address.get("/api/opendatalist")
        console.log(res.data.data)
        const opendataList = res.data.data
        this.opendataList = opendataList
        this.times = this.times + 1
        console.log(this.times)
      } catch (error) {
        console.error(error)
      }
    },

    async uploadSystem(
      username,
      uploadTitle,
      uploadExplain,
      uploadCategory,
      uploadSystemURL,
      uploadManualURL
    ) {
      const ctx = {
        user: username,
        title: uploadTitle,
        content: uploadExplain,
        category: uploadCategory,
        systemURL: uploadSystemURL,
        ManualURL: uploadManualURL,
      }
      console.log(ctx)
      try {
        const res = await address.post("/api/uploadopensystem", ctx, {
          headers: { "Content-Type": "application/json" },
        })
        const uploadRes = await res.data
        const today = new Date()
        this.uploadRes =
          uploadRes +
          " " +
          today.getHours() +
          "：" +
          today.getMinutes() +
          "：" +
          today.getSeconds()
      } catch (error) {
        console.error(error)
      }
    },

    async uploadData(
      username,
      uploadTitle,
      uploadExplain,
      uploadCategory,
      uploadFileGenre,
      uploadedJSON
    ) {
      console.log(uploadedJSON)
      const ctx = {
        user: username,
        title: uploadTitle,
        content: uploadExplain,
        category: uploadCategory,
        fileGenre: uploadFileGenre,
        JSON: uploadedJSON,
      }
      try {
        const res = await address.post("/api/uploadopendata", ctx, {
          headers: { "Content-Type": "application/json" },
        })
        const uploadRes = await res.data
        const today = new Date()
        this.uploadRes =
          uploadRes +
          " " +
          today.getHours() +
          "：" +
          today.getMinutes() +
          "：" +
          today.getSeconds()
      } catch (error) {
        console.error(error)
      }
    },

    async downloadPreview() {
      try {
        const res = await address.get(
          "/api/downloadopendata/" + this.opendataTarget
        )
        const opendataTargetResult = await res.data.data
        return opendataTargetResult
      } catch (error) {
        console.error(error)
      }
    },
    async download() {
      try {
        const res = await address.get(
          "/api/downloadopendata/" + this.opendataTarget
        )
        const opendataTargetResult = await res.data.data
        return opendataTargetResult
      } catch (error) {
        console.error(error)
      }
    },

    async createGetApi(user, title) {
      try {
        const res = await address.post(
          "/api/createGetApi",
          { user, title },
          { headers: { "Content-Type": "application/json" } }
        )
        const apiResult = await res.data.data
        //this.apiResult = apiResult;
        return apiResult
      } catch (error) {
        //console.error(error.response.data.code)
        if (error.response.data.code === 10001) {
          alert("API is already exist.")
        }
      }
    },

    async createPutApi(user, title) {
      try {
        const res = await address.put(
          "/api/createPutApi",
          { user, title },
          { headers: { "Content-Type": "application/json" } }
        )
        const apiResult = await res.data.data
        //this.apiResult = apiResult;
        return apiResult
      } catch (error) {
        //console.error(error)
        if (error.response.data.code === 10001) {
          alert("API is already exist.")
        }
      }
    },

    async createPostApi(user, title) {
      try {
        const res = await address.put(
          "/api/createPostApi",
          { user, title },
          { headers: { "Content-Type": "application/json" } }
        )
        const apiResult = await res.data.data
        //this.apiResult = apiResult;
        return apiResult
      } catch (error) {
        //console.error(error)
        if (error.response.data.code === 10001) {
          alert("API is already exist.")
        }
      }
    },

    async createDeleteApi(user, title) {
      try {
        const res = await address.put(
          "/api/createDeleteApi",
          { user, title },
          { headers: { "Content-Type": "application/json" } }
        )
        const apiResult = await res.data.data
        //this.apiResult = apiResult;
        return apiResult
      } catch (error) {
        //console.error(error)
        if (error.response.data.code === 10001) {
          alert("API is already exist.")
        }
      }
    },

    async getPersonalApiList(name) {
      try {
        const res = await address.get("/api/apilist", {
          params: {
            username: name,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
        console.log(res.data.data)
        return res.data.data
        // const apiList = await res.data
        // console.log(apiList)
        // this.apiList = apiList
      } catch (error) {
        console.error(error)
      }
    },

    async getPersonalOpendata(name) {
      try {
        const res = await address.get("/api/personalOpendatalist", {
          params: {
            username: name,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
        console.log(res.data.data)
        return res.data.data
      } catch (error) {
        console.error(error)
      }
    },

    async statusChange(title, Status) {
      try {
        const res = await address.put(
          "/api/datastatus",
          { title, Status },
          { headers: { "Content-Type": "application/json" } }
        )
        return res.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async statusChange01(API, methods, Status) {
      try {
        const res = await address.put(
          "/api/apistatus",
          { API, methods, Status },
          { headers: { "Content-Type": "application/json" } }
        )
        return res.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async dataDelete(title, user) {
      try {
        await address.post(
          "/api/dataDelete",
          { title, user },
          { headers: { "Content-Type": "application/json" } }
        )
      } catch (error) {
        console.error(error)
      }
    },
    async apiDelete(API, methods, username) {
      try {
        await address.post(
          "/api/apiDelete",
          { API, methods, username },
          { headers: { "Content-Type": "application/json" } }
        )
      } catch (error) {
        console.error(error)
      }
    },
  },
})
