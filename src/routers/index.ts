import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/modules/Home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/CompositionApi',
    name: 'CompositionApi',
    component: () => import('@/modules/CompositionApi/index.vue'),
  },
  {
    path: '/lifeHooks',
    name: 'lifeHooks',
    component: () => import('@/modules/lifeHooks/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router
