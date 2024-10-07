<template>
  <div>
    <!-- <section>
    <h3>{{ apiKeyResult }}</h3>
  </section> -->
    <section>
      <h2>検索ボックスからサービスを検索することができます。</h2>
    </section>
    <section>
      <h3>カテゴリー</h3>

      <label class="my-radio"
        ><input type="radio" v-model="selectedFileType" value="all" /><span
          class="radio-mark"
        ></span
        >すべて</label
      >

      <label class="my-radio"
        ><input type="radio" v-model="selectedFileType" value="システム" /><span
          class="radio-mark"
        ></span
        >システム</label
      >

      <label class="my-radio"
        ><input
          type="radio"
          v-model="selectedFileType"
          value="オープンデータ"
        /><span class="radio-mark"></span>オープンデータ</label
      ><br />
      <input type="text" v-model="keyword" placeholder="キーワードを入力" />
      <button type="button" @click="filterOpendataList">検索</button>
    </section>

    <form @submit.prevent="download()" style="position: relative">
      <section v-for="item in filteredOpendataList" :key="item.title">
        <h3>名称<br /></h3>
        {{ item.title }}<br />
        <h3>説明<br /></h3>
        {{ item.content }}<br />
        <h3>カテゴリー<br /></h3>
        {{ item.category }}<br />
        <div v-if="item.filegenre">
          <h3>ジャンル<br /></h3>
          {{ item.filegenre }}<br />
        </div>
        <div v-if="item.systemURL">
          <h3 v-if="item.systemURL">システムURL<br /></h3>
          <a :href="item.systemURL" target="_blank">{{ item.systemURL }}</a>
          <br />
        </div>

        <div v-if="item.category === 'オープンデータ'">
          <button type="submit" @click="setTarget(item.title)">
            Download Opendata
          </button>
          <a id="downloadAnchorElem" style="display: none"></a>

          <button
            type="button"
            :class="item.title"
            :id="item.title"
            @click="
              setTarget(item.title);
              downloadPreview($event);
            "
          >
            Preview
          </button>
          <br />

          <div>
            <div v-if="preView[0] === item.title" class="content">
              {{ preView[1] }}
            </div>
            <div v-else style="text-align: center">
              Previewのクリックでここに表示されます。
            </div>
          </div>

          <div style="padding-top: 20px">
            <span style="font-size: 24px; font-weight: 700">公開されたAPI</span>
            <div
              style="padding-top: 10px"
              v-for="item in item.ApiInfo"
              :key="item._id"
            >
              API:{{ item.API }}<br />
              Methods:{{ item.methods }}
            </div>
          </div>
        </div>
      </section>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "../store/user.js";

const userStore = useUserStore();
// const username = ref(userStore.username);
const opendataList = ref([]);
// const LoggedIn = ref(userStore.userLogged);
const preView = ref("");
const keyword = ref("");
const selectedFileType = ref("all");
//let opendataTarget;
// const apiResult = ref("");
// let apiParams;
// 使用 ref 引用 paramsContainer
// const paramsContainer = ref(null);

const filteredOpendataList = computed(() => {
  if (selectedFileType.value === "all") {
    return opendataList.value.filter(
      (item) =>
        item.title.includes(keyword.value) ||
        item.content.includes(keyword.value)
    );
  } else {
    return opendataList.value.filter(
      (item) =>
        item.category === selectedFileType.value &&
        (item.title.includes(keyword.value) ||
          item.content.includes(keyword.value))
    );
  }
});

async function getOpendata() {
  await userStore.getOpendataList();
  opendataList.value = userStore.opendataList;
}

async function setTarget(target) {
  console.log(target);
  //opendataTarget = target;
  userStore.setOpendataTarget(target);
}

async function downloadPreview(event) {
  console.log(event.currentTarget);
  const id = event.currentTarget.id;
  try {
    const res = await userStore.downloadPreview();
    preView.value = [id, res];
  } catch (error) {
    console.error(error);
  }
}

async function download() {
  try {
    const res = await userStore.download();
    const jsonString = JSON.stringify(res);
    // userStore.opendataTargetResult = res;
    DownloadJson(jsonString);
  } catch (error) {
    console.error(error);
  }
}

function DownloadJson(opendata) {
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(opendata);
  var dlAnchorElem = document.getElementById("downloadAnchorElem");
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", `${userStore.opendataTarget}.json`);
  dlAnchorElem.click();
}

function filterOpendataList() {
  opendataList.value = userStore.opendataList.filter(
    (item) =>
      item.title.includes(keyword.value) || item.content.includes(keyword.value)
  );
}

onMounted(() => {
  getOpendata();
});
</script>

<style scoped>
section {
  margin-left: 350px;
}

button.NotLoggedIn {
  background-color: #767777;
  border: 1px solid #767777;
  font: inherit;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  color: white;
  margin: 10px;
}

button.NotLoggedIn:hover,
button.NotLoggedIn:active {
  background-color: #8e8f8f;
  border-color: #8e8f8f;
}

.my-radio {
  position: relative;
  display: block;
  /* 縦並びに */
  margin: 0.5em 0;
  /* 前後のスペース */
  padding-left: 28px;
  cursor: pointer;
  user-select: none;
}

/* inputは非表示にする */
.my-radio input {
  display: none;
}

/* 常に表示する枠線の円 */
.radio-mark {
  position: absolute;
  top: 0;
  /* 上からの位置 */
  left: 0;
  height: 22px;
  /* 大きさ */
  width: 22px;
  /* 大きさ */
  border: solid 2px #d4dae2;
  /* 線 */
  border-radius: 50%;
  box-sizing: border-box;
}

/* 選択時に重ねる円 */
.radio-mark:after {
  content: "";
  position: absolute;
  background: #2e80ff;
  /* 色 */
  border-radius: 50%;
  top: 2px;
  bottom: 2px;
  left: 2px;
  right: 2px;
  opacity: 0;
  /* 透明にしておく */
}

/* 選択時に重ねた円の透明を解除 */
.my-radio input:checked + .radio-mark:after {
  opacity: 1;
}

.content {
  height: 200px; /* 设置容器的固定高度 */
  overflow-y: auto; /* 允许垂直滚动，如果内容溢出容器高度 */
  /* overflow-x: auto; */
  border: 1px solid #ccc; /* 可以添加边框样式 */
  padding: 10px; /* 可以添加内边距样式 */
}

.content-clicked {
  font-weight: 700;
}

.param-item {
  margin: none; /* 添加一些间距使其更好看 */
}
</style>
