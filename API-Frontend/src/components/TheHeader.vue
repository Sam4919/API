<template>
  <div>
    <!-- <header>
    <h1>API Service Platform</h1>
    <h2>Powered by K-lab</h2>
  </header> -->
    <section class="sec1" style="z-index: 999">
      User: {{ username }}
      <router-link to="/main" v-if="LoggedIn">
        <button @click="logout">ログアウト</button>
      </router-link>
      <router-link to="/userlogin" v-else>
        <button>ログイン</button>
      </router-link>
    </section>
    <section class="sec2" style="z-index: 999">
      <nav class="nav1">
        <ul>
          <li>
            <router-link to="/main">Main</router-link>
          </li>
          <!-- <li>
        <router-link to="/getjson">Get Json</router-link>
      </li> -->
          <li>
            <router-link to="/userlogin">User Login</router-link>
          </li>
          <li>
            <router-link to="/opendataupload"
              >Upload Open data/Registered system</router-link
            >
          </li>
          <li>
            <router-link to="/opendatacatalog"
              >Find Open data/Registered system</router-link
            >
          </li>
          <li>
            <router-link to="/userinfo">User Center</router-link>
          </li>

          <!-- <div class="loginperson">
            登録したユーザー数: {{ loginpersons }} 人
          </div>
          <div class="timeofperson">
            現在システムを使用しているユーザー数: {{ persons }} 人
          </div> -->

          <!-- <div class="timeofapi">API使用情况:{{ times }} </div> -->
        </ul>
      </nav>
    </section>
    <!-- <section class="sec2">+</section> -->
  </div>
</template>

<script setup>
import { useUserStore } from "../store/user.js";
import { ref } from "vue";

const userStore = useUserStore();
const username = ref(userStore.username);
const LoggedIn = ref(userStore.userLogged);
const times = ref(userStore.times);
const persons = ref(userStore.persons);
const loginpersons = ref(userStore.loginpersons);

userStore.$subscribe(() => {
  username.value = userStore.username;
  LoggedIn.value = userStore.userLogged;
  times.value = userStore.times;
  persons.value = userStore.persons;
  loginpersons.value = userStore.loginpersons;
});

function logout() {
  userStore.logout();
}

//计时器
setInterval(function () {
  // 这里放置要重复执行的代码
  userStore.getUserLoginNumber();
  userStore.getUsernumber();
}, 2000); // 每隔2秒执行一次

//关闭页面自动退出
// window.addEventListener('beforeunload', function (e) {
//   // 发送退出登录请求给后端
//   // 这里可以使用 AJAX 或其他适当的方法发送请求
//   // 例如使用 fetch 或 XMLHttpRequest
//   // 注意：在这里发送请求可能不会等待完成

//   // // 以下是使用 fetch 发送退出登录请求的示例代码
//   // fetch('/logout', {
//   //   method: 'POST',
//   //   credentials: 'same-origin', // 根据需要设置正确的凭证
//   // })
//   //   .then((response) => {
//   //     // 处理响应
//   //     // 这里可以根据后端返回的数据执行适当的操作
//   //   })
//   //   .catch((error) => {
//   //     // 处理错误
//   //     console.error('Error while logging out:', error)
//   //   })
//   userStore.logout()
//   // 由于 beforeunload 事件处理程序执行异步操作
//   // 浏览器可能会在操作完成之前关闭页面
//   // 因此，这里不应该阻止默认的页面关闭行为
//   // 但你可以返回一个提示消息，询问用户是否要离开页面
//   var confirmationMessage = '确定要离开吗？'
//   ;(e || window.event).returnValue = confirmationMessage // 兼容旧版浏览器
//   return confirmationMessage
// })
</script>

<style scoped>
section {
  position: fixed;

  margin: 30px 10px;
}

.sec1 {
  margin-top: 6rem;
}
.sec2 {
  margin-top: 12rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li a {
  text-decoration: none;
  color: black;
}
li a:hover {
  background: rgb(215, 213, 213);
  border-radius: 0.5cm;
}

h2 {
  margin-bottom: 30px;
  margin-left: 7px;
  font-size: 12px;
  font-weight: normal;
}
</style>
