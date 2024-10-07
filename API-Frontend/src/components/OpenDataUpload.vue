<template>
  <form @submit.prevent="submitForm">
    <div v-if="LoggedIn">
      <section>
        <h2>
          投稿するサービスの「名称」「説明」を入力し，カテゴリーを選択してください．
        </h2>
      </section>

      <section>
        <div>
          <label for="uploadtitle">名称</label>
          <input id="uploadtitle" type="text" v-model="uploadTitle" />
          <label for="uploadexplain">説明</label>
          <input id="uploadexplain" type="text" v-model="uploadExplain" /><br />
          <h3>カテゴリー</h3>
          <label for="uploadcategory_system" class="my-radio">
            <input
              type="radio"
              id="uploadcategory_system"
              v-model="uploadCategory"
              value="システム"
            /><span class="radio-mark"></span> システム</label
          >

          <label for="uploadcategory_data" class="my-radio">
            <input
              type="radio"
              id="uploadcategory_data"
              v-model="uploadCategory"
              value="オープンデータ"
            /><span class="radio-mark"></span>オープンデータ</label
          >
        </div>
      </section>

      <!-- システムの入力項目 -->
      <div v-if="uploadCategory === 'システム'">
        <section>
          <h2>URLを入力してください。</h2>
        </section>
        <section>
          <label for="uploadsystemURL"> システムURL </label>
          <input id="uploadsystemURL" type="text" v-model="uploadSystemURL" />
          <label for="uploadmanualURL"
            >システムに関する資料(PDF)をアップロードすることができます</label
          >
          <input
            id="uploadmanualURL"
            type="file"
            accept="application/pdf"
            @change="handleFileUpload"
          />
          <span v-if="fileError" style="color: red">{{ fileError }}</span
          ><br />
          <h3>
            Upload Result :<br />
            {{ uploadResult }}
          </h3>
          <button type="submit">Upload to DB</button>
        </section>
      </div>

      <!-- オープンデータの入力項目 -->
      <div v-if="uploadCategory === 'オープンデータ'">
        <section>
          <h2>該当する項目を選択し，投稿するファイルを選択してください。</h2>
        </section>

        <section>
          <h4>ジャンル</h4>
          <label for="uploadfilegenre_bridge" class="my-radio"
            ><input
              type="radio"
              id="uploadfilegenre_bridge"
              v-model="uploadFileGenre"
              value="橋梁"
            /><span class="radio-mark"></span>橋梁</label
          >

          <label for="uploadfilegenre_tunnel" class="my-radio"
            ><input
              type="radio"
              id="uploadfilegenre_tunnel"
              v-model="uploadFileGenre"
              value="トンネル"
            /><span class="radio-mark"></span> トンネル</label
          >

          <label for="uploadfilegenre_other" class="my-radio"
            ><input
              type="radio"
              id="uploadfilegenre_other"
              v-model="uploadFileGenre"
              value="その他"
            /><span class="radio-mark"></span> その他
          </label>
          <br />
          <label for="uploadfile">Upload File</label>
          <input id="uploadfile" @change="loadLog" type="file" />
          <h3>
            Upload Result :<br />
            {{ uploadResult }}
          </h3>
          <button type="submit">Upload to DB</button>
        </section>
      </div>
    </div>

    <div v-else>
      <section>
        <h2>ログインが必要です。</h2>
      </section>
    </div>
  </form>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import { useUserStore } from "../store/user.js";

const userStore = useUserStore();
const uploadedJSON = ref([]);
const uploadTitle = ref("");
const uploadExplain = ref("");
const uploadCategory = ref("");
const uploadFileGenre = ref("");
const uploadSystemURL = ref("");
const uploadManualURL = ref("");
const username = ref(userStore.username);
const uploadResult = ref(null);
const LoggedIn = ref(userStore.userLogged);
const fileError = ref(null);

async function loadLog(event) {
  const files = event.target.files || event.dataTransfer.files;
  const file = files[0];

  if (!checkFile(file)) {
    alert("ファイル読み込みに問題があります。");
    return;
  }
  try {
    const logData = await getFileData(file);
    const logJson = JSON.parse(logData);
    console.log(logJson);
    uploadedJSON.value = logJson;
  } catch (error) {
    alert("JSONファイルに問題があります。" + error.message);
    uploadResult.value = "Result Fail";
  }
}
function getFileData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function checkFile(file) {
  if (!file) {
    return false;
  }

  if (file.type !== "application/json") {
    return false;
  }

  const SIZE_LIMIT = 5000000; // 5MB
  if (file.size > SIZE_LIMIT) {
    return false;
  }
  return true;
}

function submitForm() {
  if (!isFormValid()) {
    alert("入力内容に問題があります。");
    return;
  }
  upload();
}

function isFormValid() {
  // 各フォームの内容をチェックし、問題があれば false を返す
  if (uploadTitle.value.trim() === "") {
    return false;
  }
  if (uploadExplain.value.trim() === "") {
    return false;
  }
  return true;
}

async function upload() {
  // user.value = userStore.user
  if (uploadCategory.value === "システム") {
    //console.log('システム')
    //console.log(username.value,uploadTitle.value,uploadExplain.value,uploadCategory.value,uploadSystemURL.value)
    await userStore.uploadSystem(
      username.value,
      uploadTitle.value,
      uploadExplain.value,
      uploadCategory.value,
      uploadSystemURL.value,
      uploadManualURL.value
    );
  } else if (uploadCategory.value === "オープンデータ") {
    //console.log('オープンデータ')
    //console.log(username.value,uploadTitle.value,uploadExplain.value,uploadCategory.value,uploadFileGenre.value,uploadedJSON.value)
    await userStore.uploadData(
      username.value,
      uploadTitle.value,
      uploadExplain.value,
      uploadCategory.value,
      uploadFileGenre.value,
      uploadedJSON.value
    );
  }

  uploadResult.value = userStore.uploadRes;
}

onUnmounted(() => {
  uploadResult.value = userStore.uploadRes;
});

async function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) {
    fileError.value = "ファイルが選択されていません";
    return;
  }
  if (file.type !== "application/pdf") {
    fileError.value = "選択されたファイルがPDF形式ではありません";
    return;
  }

  if (file) {
    const url = URL.createObjectURL(file);
    // uploadManualURLの値を更新する
    uploadManualURL.value = url;
  }
}
</script>

<style>
section {
  margin-left: 350px;
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
</style>
