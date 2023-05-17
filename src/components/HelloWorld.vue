<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <div>
    <img src="/vite.svg" class="logo" alt="Vite logo" />

    <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
  </div>
  <h1>{{ msg }}</h1>
  <h2>
    多环境变量 + 配置 alias 别名 + Sass + Vue-router自动生成路由 + Pinia
    状态管理 + Eslint + Prettier 统一开发规范 + Axios 封装 + 配置 proxy 跨域 +
    Element Plus 自动按需加载 + Markdown预览
  </h2>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
