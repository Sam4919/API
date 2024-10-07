<template>
  <form @submit.prevent="signup">
    <section>
      <label>Email</label>
      <input type="text" v-model="useremail" />
      <label>Username</label>
      <input type="text" v-model="username" />
      <label>Password</label>
      <input type="password" v-model="password" />
      <button type="submit">Sign up</button>
    </section>
  </form>
</template>

<script setup>
import { useUserStore } from "../store/user.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

//import { ElMessage } from 'element-plus'

const userStore = useUserStore();
const router = useRouter();
const useremail = ref("");
const username = ref("");
const password = ref("");
async function signup() {
  await userStore.signUp(useremail.value, username.value, password.value);
  router.push("/userlogin");
}
</script>
<style scoped>
section {
  margin-left: 350px;
}
</style>
