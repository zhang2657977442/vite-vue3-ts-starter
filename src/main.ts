import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

// 引入全局样式
import '@/styles/index.scss';
import 'highlight.js/styles/atom-one-dark.css';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
