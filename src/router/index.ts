import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useMainStore } from '@/stores/main';

import HomeView from '@/views/HomeView.vue';
import SearchView from '@/views/SearchView.vue';
import LibraryView from '@/views/LibraryView.vue';
import ProfileView from '@/views/ProfileView.vue';
import UploadSongViewVue from '@/views/UploadSongView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/search',
    component: SearchView,
  },
  {
    path: '/library',
    component: LibraryView
  },
  {
    path: '/profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardia de navegación para verificar autenticación
router.beforeEach((to, from, next) => {
  const mainStore = useMainStore();

  if (to.meta.requiresAuth && !mainStore.$state.token) {
    next('/');
  } else {
    next();
  }
});

export default router;