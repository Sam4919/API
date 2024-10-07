<template>
  <section>
    <h1>
      こちらはメインページです。 <br />
      現在のユーザーは, 「{{ username }}」 です。
    </h1>
    <h2>
      社会基盤施設の維持管理を支援しオープンデータの利用・活用を促進するためのサービス連携プラットフォームのプロトタイプです。<br /><br />
      左のナビゲーションから機能を選択してください。
    </h2>
  </section>
</template>

<script setup>
import { useUserStore } from "../store/user.js";
import { ref } from "vue";

const userStore = useUserStore();
const username = ref(userStore.username);

userStore.$subscribe(() => {
  username.value = userStore.username;
});
</script>

<style scoped>
section {
  margin-left: 350px;
}
h2 {
  font-size: 20px;
  font-weight: normal;
}
</style>
