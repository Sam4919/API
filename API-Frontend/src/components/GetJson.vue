<template>
  <section>
    <div v-if="LoggedIn">
      <button @click="getJson">getJson!</button>
      <h3>{{ savedJson }}</h3>
    </div>

    <div v-else>
      <h2>ログインが必要です。</h2>
    </div>
  </section>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useUserStore } from "../store/user.js";

const LoggedIn = ref(useUserStore().userLogged);

const savedJson = ref("nothing");

async function getJson() {
  try {
    const responseGet = await axios.get("http://localhost:3000/getopendata", {
      params: {
        ApiKey: "470f181f977e4ed39c60f8f9588b3790",
      },
    });
    savedJson.value = responseGet.data;
  } catch (error) {
    console.error(error);
  }
}
</script>

<style scoped>
h3 {
  font-size: 50%;
}
</style>
