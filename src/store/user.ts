import { defineStore } from 'pinia';
import { useAppStore } from './app';

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      name: '张三',
      age: 18,
    };
  },
  getters: {
    fullName: (state) => {
      return state.name + '丰';
    },
  },
  actions: {
    updateState(data: any) {
      this.$state = data;
      this.updateAppConfig();
    },
    updateAppConfig() {
      const appStore = useAppStore();
      appStore.setData('app-update');
    },
  },
});
