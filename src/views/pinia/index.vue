<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserSession } from "@/store/userSession";

const userSession = useUserSession();
const { userInfo } = storeToRefs(userSession);


</script>
<template>
  <div>姓名：{{ userInfo.name }}</div>
  <div>邮箱：{{ userInfo.email }}</div>
  <div>年龄：{{ userInfo.erp }}</div>
  <button @click="userInfo.erp ++">更新数据</button>
</template>

<style lang="scss" scoped></style>
