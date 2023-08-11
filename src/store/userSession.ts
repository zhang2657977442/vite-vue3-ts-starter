import { ref } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";

export const useUserSession = defineStore("userSession", () => {
  const userInfo = ref<UserType.User>({
    name: '张三',
    erp: 18,
    email: 'xxxxxxxxx@.com',
  });
  return {
    userInfo,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserSession, import.meta.hot));
}
