import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Operasi Semut - Bergerak Bersama untuk Indonesia' }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/BlogView.vue'),
    meta: { title: 'Blog - Operasi Semut' }
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: () => import('@/views/BlogDetailView.vue'),
    meta: { title: 'Blog Detail - Operasi Semut' }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/DashboardView.vue'),
        meta: { title: 'Dashboard - Admin' }
      },
      {
        path: 'content',
        name: 'AdminContent',
        component: () => import('@/views/admin/ContentView.vue'),
        meta: { title: 'Kelola Konten - Admin' }
      },
      {
        path: 'blog',
        name: 'AdminBlog',
        component: () => import('@/views/admin/BlogView.vue'),
        meta: { title: 'Kelola Blog - Admin' }
      },
      {
        path: 'settings',
        name: 'AdminSettings',
        component: () => import('@/views/admin/SettingsView.vue'),
        meta: { title: 'Pengaturan - Admin' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: 'Login - Operasi Semut' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '404 - Halaman Tidak Ditemukan' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guard untuk authentication
router.beforeEach((to, from, next) => {
  // Update document title
  document.title = to.meta.title || 'Operasi Semut'
  
  // Check authentication untuk admin routes
  if (to.meta.requiresAuth) {
    const isAuthenticated = localStorage.getItem('adminToken')
    if (!isAuthenticated) {
      next({ name: 'Login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
