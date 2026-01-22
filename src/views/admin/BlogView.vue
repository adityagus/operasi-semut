<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Kelola Blog</h1>
      <button
        @click="showAddModal = true"
        class="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
      >
        + Buat Blog Baru
      </button>
    </div>
    
    <BlogManagement 
      :isOpen="true" 
      @close="() => {}"
      @viewBlog="viewBlogDetail"
      :isStandalone="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BlogManagement from '@/components/BlogManagement.vue'

const showAddModal = ref(false)

const viewBlogDetail = (blog) => {
  console.log('View blog:', blog)
}
</script>
