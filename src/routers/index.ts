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
  {
    path: '/computedApi',
    name: 'computedApi',
    component: () => import('@/modules/computedApi/index.vue'),
  },
  {
    path: '/watchApi',
    name: 'watchApi',
    component: () => import('@/modules/watchApi/index.vue'),
  },
  {
    path: '/teleportCom',
    name: 'teleportCom',
    component: () => import('@/modules/teleportCom/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router
