<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
    
    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white rounded-lg shadow p-6"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">{{ stat.label }}</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ stat.value }}</p>
          </div>
          <div class="text-4xl">{{ stat.icon }}</div>
        </div>
      </div>
    </div>
    
    <!-- Recent Activities -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold">Aktivitas Terbaru</h2>
      </div>
      <div class="p-6">
        <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start space-x-4 py-3">
          <div class="text-2xl">{{ activity.icon }}</div>
          <div class="flex-1">
            <p class="text-gray-900">{{ activity.title }}</p>
            <p class="text-gray-600 text-sm">{{ activity.time }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  { label: 'Total Relawan', value: '1,234', icon: '👥' },
  { label: 'Kolaborasi Aktif', value: '45', icon: '🤝' },
  { label: 'Blog Posts', value: '89', icon: '📝' },
  { label: 'Pengunjung (bulan ini)', value: '12.5K', icon: '📈' }
])

const recentActivities = ref([
  { id: 1, icon: '✅', title: 'Relawan baru terdaftar: John Doe', time: '2 menit yang lalu' },
  { id: 2, icon: '📄', title: 'Proposal kolaborasi baru diterima', time: '1 jam yang lalu' },
  { id: 3, icon: '📝', title: 'Blog post baru dipublikasikan', time: '3 jam yang lalu' },
  { id: 4, icon: '💬', title: 'Komentar baru di blog', time: '5 jam yang lalu' }
])
</script>
