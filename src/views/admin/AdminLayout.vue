<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white">
      <div class="p-6">
        <h2 class="text-2xl font-bold">Admin Panel</h2>
        <p class="text-gray-400 text-sm">Operasi Semut</p>
      </div>
      
      <nav class="mt-6">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center px-6 py-3 hover:bg-gray-800 transition-colors"
          :class="{ 'bg-gray-800 border-l-4 border-green-500': $route.path === item.path }"
        >
          <span class="text-xl mr-3">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </router-link>
      </nav>
      
      <div class="absolute bottom-0 w-full p-6">
        <button
          @click="handleLogout"
          class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="ml-64 p-8">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: '📊' },
  { path: '/admin/content', label: 'Kelola Konten', icon: '📝' },
  { path: '/admin/blog', label: 'Kelola Blog', icon: '📰' },
  { path: '/admin/settings', label: 'Pengaturan', icon: '⚙️' }
]

const handleLogout = () => {
  localStorage.removeItem('adminToken')
  router.push('/login')
}
</script>
