import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import SearchView from '@/views/SearchView.vue'
import LibraryView from '@/views/LibraryView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/search',
    component: SearchView
  },
  {
    path: '/library',
    component: LibraryView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router