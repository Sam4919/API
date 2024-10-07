<template>
  <form @submit.prevent="login">
    <section>
      <div v-if="LoggedIn">
        <h2>既にログインされています</h2>
      </div>

      <div v-else>
        <label>Email</label>
        <input type="text" v-model="useremail" />
        <!-- <label>Username</label>
        <input type="text" v-model="username" /> -->
        <label>Password</label>
        <input type="password" v-model="password" />
        <!-- <label>Verification code</label>
        <button 
          style="
            background-color: rgb(65, 158, 250);
            font-size: 10px;
            border-radius: 10px;
            width: 100px;
            padding: 1%;
          "
        >
          Get the code
        </button>
        <input type="text" v-model="captchaCode1" /> -->
        <button type="submit">Login</button>
        <router-link to="/usersignup"><button>Sign up</button></router-link>
      </div>
    </section>
  </form>
</template>

<script setup>
import { useUserStore } from "../store/user.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const useremail = ref("");

const password = ref("");
const router = useRouter();

async function login() {
  await userStore.signIn(useremail.value, password.value);
  router.push("/main");
}
</script>

<style scoped>
section {
  margin-left: 350px;
}
</style>
