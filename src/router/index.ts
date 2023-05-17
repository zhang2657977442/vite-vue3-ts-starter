import { createRouter, createWebHistory } from 'vue-router';
import routes from 'pages-generated';

const router = createRouter({
  history: createWebHistory(), // HashHistory
  routes,
});

export default router;
