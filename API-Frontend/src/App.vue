<template>
  <the-header></the-header>
  <the-operation></the-operation>
  <router-view></router-view>
</template>

<script setup>
//import { ref, computed, watch } from 'vue';
import TheHeader from "./components/TheHeader.vue";
import TheOperation from "./components/TheOperation.vue";
</script>

<style>
/* html {
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica,
    Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif !important;
} */
body {
  padding: 0;
  margin: 0;
}

section {
  margin: 2rem auto;
  max-width: 35rem;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
}

/* form div {
  margin: 1rem 0;
} */
input {
  width: 100%;
  padding: 0.15rem;
}
label {
  font-weight: bold;
  margin: 0.5rem 0;
}
button {
  background-color: #18191c;
  border: 1px solid #18191c;
  border-radius: 1rem;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  color: #18191c;
  margin: 10px;
  color: white;
}
button:hover,
button:active {
  background-color: #00aeec;
  border-color: #00aeec;
}
</style>
