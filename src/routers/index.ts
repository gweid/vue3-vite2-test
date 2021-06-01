import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/modules/Home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('@/modules/Mine/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router
