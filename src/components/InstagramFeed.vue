<template>
  <section class="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          Ikuti Kami di Instagram
        </h2>
        <p class="text-lg text-gray-600 mb-6">
          Lihat aktivitas terbaru dan inspirasi dari komunitas kami
        </p>
        <a
          :href="`https://www.instagram.com/${displayUsername}/`"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>Follow {{ displayUsername }}</span>
        </a>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="i in 8"
          :key="i"
          class="aspect-square bg-gray-200 rounded-lg animate-pulse"
        ></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600 mb-4">{{ error }}</p>
        <p class="text-gray-600">Menampilkan konten demo</p>
      </div>

      <!-- Instagram Grid -->
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <a
          v-for="post in displayPosts"
          :key="post.id"
          :href="post.permalink"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
        >
          <img
            :src="post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url"
            :alt="post.caption ? post.caption.substring(0, 50) : 'Instagram post'"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-0 left-0 right-0 p-4">
              <p class="text-white text-sm line-clamp-2">
                {{ post.caption || 'Lihat post di Instagram' }}
              </p>
            </div>
          </div>

          <!-- Video Icon -->
          <div v-if="post.media_type === 'VIDEO'" class="absolute top-4 right-4">
            <svg class="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
            </svg>
          </div>
        </a>
      </div>

      <!-- Load More Button (if needed) -->
      <div v-if="posts.length > displayLimit" class="text-center mt-8">
        <button
          @click="displayLimit += 8"
          class="px-8 py-3 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-900 transition-colors"
        >
          Lihat Lebih Banyak
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useInstagram } from '@/composables/useInstagram'

const { posts, loading, error, username, fetchInstagramPosts, generateMockPosts } = useInstagram()

const displayLimit = ref(8)

const displayPosts = computed(() => {
  return posts.value.slice(0, displayLimit.value)
})

const displayUsername = computed(() => {
  return username.value || '@operasemut'
})

onMounted(async () => {
  // Get Instagram token from settings
  const settings = localStorage.getItem('siteSettings')
  let token = null
  
  if (settings) {
    const parsed = JSON.parse(settings)
    token = parsed.instagramToken
  }

  if (token) {
    await fetchInstagramPosts(token, 12)
  } else {
    // Use mock data for demo
    posts.value = generateMockPosts(12)
  }
})
</script>
