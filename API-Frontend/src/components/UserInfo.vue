<template>
  <div>
    <section>
      <h2>{{ username }} さんの保有Dataリスト,APIリスト</h2>
    </section>

    <form style="position: relative">
      <section v-for="item in dataList" :key="item.title">
        <h3>名称<br /></h3>
        {{ item.title }}<br />
        <h3>説明<br /></h3>
        {{ item.content }}<br />
        <h3>カテゴリー<br /></h3>
        {{ item.category }}<br />
        <!-- <div v-if="item.filegenre">
          <h3>ジャンル<br /></h3>
          {{ item.filegenre }}<br />
        </div> -->
        <div v-if="item.systemURL">
          <h3 v-if="item.systemURL">システムURL<br /></h3>
          <a :href="item.systemURL" target="_blank">{{ item.systemURL }}</a>
          <br />
        </div>

        <div v-if="item.category === 'オープンデータ'">
          <!-- <button type="submit" @click="setTarget(item.title)">
            Download Opendata
          </button>
          <a id="downloadAnchorElem" style="display: none"></a> -->

          <!-- <button
            type="button"
            :class="item.title"
            :id="item.title"
            @click="
              setTarget(item.title);
              downloadPreview($event);
            "
          >
            Preview
          </button> -->

          <div>
            <button
              v-if="item.Status === 'Unpublic'"
              @click="
                setTarget(item.title);
                statusChange($event, item);
              "
            >
              公開します
            </button>
            <button
              v-else
              @click="
                setTarget(item.title);
                statusChange($event, item);
              "
            >
              非公開します
            </button>
            <button
              @click="
                setTarget(item.title);
                dataDelete($event, item);
              "
            >
              削除
            </button>
          </div>

          <br />

          <button
            v-if="LoggedIn"
            :class="item.title"
            :id="item.title"
            type="button"
            class="LoggedIn"
            @click="
              setTarget(item.title);
              createGetApi($event);
            "
          >
            Get API
          </button>
          <button
            v-if="LoggedIn"
            :class="item.title"
            :id="item.title"
            type="button"
            class="LoggedIn"
            @click="
              setTarget(item.title);
              createPutApi($event);
            "
          >
            Put API
          </button>
          <button
            v-if="LoggedIn"
            :class="item.title"
            :id="item.title"
            type="button"
            class="LoggedIn"
            @click="
              setTarget(item.title);
              createPostApi($event);
            "
          >
            Post API
          </button>
          <button
            v-if="LoggedIn"
            :class="item.title"
            :id="item.title"
            type="button"
            class="LoggedIn"
            @click="
              setTarget(item.title);
              createDeleteApi($event);
            "
          >
            Delete API
          </button>

          <!-- <div>
            <div v-if="preView[0] === item.title" class="content">
              {{ preView[1] }}
            </div>
            <div v-else style="text-align: center">
              Previewのクリックでここに表示されます。
            </div>
          </div> -->

          <div v-if="LoggedIn">
            <div v-if="apiResult[0] === item.title">
              <div v-if="apiResult[2] === 'Get'">
                <span class="content-clicked">method:Get</span><br />
                <span class="content-clicked">API:</span>{{ apiResult[1] }}
              </div>
              <div v-else-if="apiResult[2] === 'Put'">
                <span class="content-clicked">method:Put</span><br />
                <span class="content-clicked">API:</span>{{ apiResult[1]
                }}<br />
                <span class="content-clicked"> Params: </span>
                <div id="paramsContainer" ref="paramsContainer"></div>
              </div>
              <div v-else-if="apiResult[2] === 'Post'">
                <span class="content-clicked">method:Post</span><br />
                <span class="content-clicked">API:</span>{{ apiResult[1]
                }}<br />
                <span class="content-clicked"> Params: </span>
                <div id="paramsContainer" ref="paramsContainer"></div>
              </div>
              <div v-else-if="apiResult[2] === 'Delete'">
                <span class="content-clicked">method:Delete</span><br />
                <span class="content-clicked">API:</span
                >{{ apiResult[1] }}/id<br />
                <span class="content-clicked"> Params: </span>
                <div id="paramsContainer" ref="paramsContainer"></div>
              </div>
            </div>

            <div v-else style="text-align: center">
              APIのクリックでここに表示されます。
            </div>
          </div>
        </div>
      </section>
    </form>

    <div v-if="apiList !== 'NotExist'">
      <form action="">
        <section v-for="item in apiList" :key="item.User">
          <h3>API<br /></h3>
          {{ item.API }}<br />
          <h3>API Methods<br /></h3>
          {{ item.methods }}<br />
          <h3>API Params<br /></h3>
          {{ item.params ? item.params : "必要ない" }}<br />
          <div>
            <button
              v-if="item.Status === 'Unpublic'"
              @click="
                setTarget(item.title);
                statusChange01($event, item);
              "
            >
              公開します
            </button>
            <button
              v-else
              @click="
                setTarget(item.title);
                statusChange01($event, item);
              "
            >
              非公開します
            </button>
            <button
              @click="
                setTarget(item.title);
                apiDelete($event, item);
              "
            >
              削除
            </button>
          </div>
        </section>
      </form>
    </div>
    <div v-else>
      <section>
        <h3>保有しているAPI Keyはないです。</h3>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useUserStore } from "../store/user.js";
//import { el } from "element-plus/es/locale/index.js";
const userStore = useUserStore();
const username = ref(userStore.username);
const apiList = ref("");
const dataList = ref("");

async function getOpendata() {
  const res = await userStore.getPersonalOpendata(username.value);
  dataList.value = res;
}
async function getApiList() {
  const res = await userStore.getPersonalApiList(username.value);
  apiList.value = res;
}

// const opendataList = ref([]);
const LoggedIn = ref(userStore.userLogged);
//const preView = ref("");
// const keyword = ref("");
// const selectedFileType = ref("all");
let opendataTarget;
const apiResult = ref("");
let apiParams;
// 使用 ref 引用 paramsContainer

// const filteredOpendataList = computed(() => {
//   if (selectedFileType.value === "all") {
//     return opendataList.value.filter(
//       (item) =>
//         item.title.includes(keyword.value) ||
//         item.content.includes(keyword.value)
//     );
//   } else {
//     return opendataList.value.filter(
//       (item) =>
//         item.category === selectedFileType.value &&
//         (item.title.includes(keyword.value) ||
//           item.content.includes(keyword.value))
//     );
//   }
// });

async function setTarget(target) {
  opendataTarget = target;
  userStore.setOpendataTarget(target);
}

async function createGetApi(event) {
  try {
    console.log(event.currentTarget.id);
    const id = event.currentTarget.id;
    const token = localStorage.getItem("Token");
    if (token !== null) {
      const res = await userStore.createGetApi(username.value, opendataTarget);
      if (res) {
        apiResult.value = [id, res, "Get"];
      }
    } else {
      console.log("Token does not exist. Please log in.");
    }
  } catch (error) {
    //console.error(error);
    alert(error.message);
  }
}

async function createPutApi(event) {
  console.log(event.currentTarget.id);
  const id = event.currentTarget.id;
  const token = localStorage.getItem("Token");

  if (token !== null) {
    const res = await userStore.createPutApi(username.value, opendataTarget);
    console.log(res);
    if (res) {
      apiResult.value = [id, res.resultUrl, "Put"];
    }
    console.log(apiResult.value);
    apiParams = res.putApiParams;
    if (apiParams) {
      // 清空之前的参数内容
      await nextTick();
      const paramsContainer = document.getElementById("paramsContainer");
      paramsContainer.innerHTML = "";
      Object.entries(apiParams).forEach(([key, value]) => {
        const paramElement = document.createElement("div");
        paramElement.textContent = `${key}: ${JSON.stringify(value, null, 2)}`; // 显示键值对
        console.log(paramElement.textContent);
        paramElement.classList.add("param-item");
        paramsContainer.appendChild(paramElement);
      });
    }

    // await userStore.createPutApi(username.value, opendataTarget, apiParams);
  } else {
    console.log("Token does not exist. Please log in.");
  }
}

async function createPostApi(event) {
  console.log(event.currentTarget.id);
  const id = event.currentTarget.id;
  const token = localStorage.getItem("Token");
  if (token !== null) {
    const res = await userStore.createPostApi(username.value, opendataTarget);
    console.log(res);
    if (res) {
      apiResult.value = [id, res.resultUrl, "Post"];
    }
    console.log(apiResult.value);
    apiParams = res.postApiParams;
    console.log(apiParams);
    if (apiParams) {
      // 清空之前的参数内容
      await nextTick();
      const paramsContainer = document.getElementById("paramsContainer");
      paramsContainer.innerHTML = "";
      // 获取所有参数，排除第一个
      const entries = Object.entries(apiParams).slice(1);
      entries.forEach(([key, value]) => {
        const paramElement = document.createElement("div");
        paramElement.textContent = `${key}: ${JSON.stringify(value, null, 2)}`; // 显示键值对
        //console.log(paramElement.textContent);
        paramElement.classList.add("param-item");
        paramsContainer.appendChild(paramElement);
      });
    }
  } else {
    console.log("Token does not exist. Please log in.");
  }
}

async function createDeleteApi(event) {
  console.log(event.currentTarget.id);
  const id = event.currentTarget.id;
  const token = localStorage.getItem("Token");
  if (token !== null) {
    const res = await userStore.createDeleteApi(username.value, opendataTarget);
    //console.log(res);
    if (res) {
      apiResult.value = [id, res.resultUrl, "Delete"];
    }
    //console.log(apiResult.value);
    apiParams = res.deleteApiParams;
    if (apiParams) {
      // apiParams.forEach((param) => {
      //   const paramElement = document.createElement("div");
      //   paramElement.textContent = JSON.stringify(param, null, 2); // 格式化 JSON 对象
      //   paramElement.classList.add("param-item");
      //   paramsContainer.appendChild(paramElement);
      // });
      // 清空之前的参数内容
      await nextTick();
      const paramsContainer = document.getElementById("paramsContainer");
      paramsContainer.innerHTML = "";
      const firstEntry = Object.entries(apiParams)[0];
      if (firstEntry) {
        const [key, value] = firstEntry;
        const paramElement = document.createElement("div");
        paramElement.textContent = `${key}: ${JSON.stringify(value, null, 2)}`; // 显示键值对
        //console.log(paramElement.textContent);
        paramElement.classList.add("param-item");
        paramsContainer.appendChild(paramElement);
      }
    }
  } else {
    console.log("Token does not exist. Please log in.");
  }
}

// function DownloadJson(opendata) {
//   var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(opendata);
//   var dlAnchorElem = document.getElementById("downloadAnchorElem");
//   dlAnchorElem.setAttribute("href", dataStr);
//   dlAnchorElem.setAttribute("download", `${userStore.opendataTarget}.json`);
//   dlAnchorElem.click();
// }

// function filterOpendataList() {
//   opendataList.value = userStore.opendataList.filter(
//     (item) =>
//       item.title.includes(keyword.value) || item.content.includes(keyword.value)
//   );
// }

async function statusChange(event, item) {
  let Status;
  if (item.Status === "public") {
    Status = "Unpublic";
  } else {
    Status = "public";
  }
  //修改状态 更新数据库 重新渲染
  await userStore.statusChange(opendataTarget, Status);
}

async function statusChange01(event, item) {
  //event.preventDefault();
  let Status01;
  if (item.Status === "public") {
    Status01 = "Unpublic";
  } else {
    Status01 = "public";
  }
  //修改状态 更新数据库 重新渲染
  await userStore.statusChange01(item.API, item.methods, Status01);
}

async function dataDelete(event, item) {
  //event.preventDefault();
  // console.log(item.title);
  // console.log(username.value);
  await userStore.dataDelete(item.title, username.value);
}

async function apiDelete(event, item) {
  //event.preventDefault();
  // console.log(item.title);
  // console.log(username.value);
  await userStore.apiDelete(item.API, item.methods, username.value);
}

onMounted(() => {
  getApiList();
  getOpendata();
});
</script>

<style scoped>
section {
  margin-left: 350px;
}
</style>
