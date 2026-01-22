<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <BlogDetail v-if="selectedBlog" :isOpen="true" :blog="selectedBlog" @close="$router.back()" />
      <div v-else class="text-center text-gray-500 py-32 text-xl">Blog tidak ditemukan.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BlogDetail from '@/components/BlogDetail.vue'

const route = useRoute()
const selectedBlog = ref(null)

// Dummy data sama seperti di Blog.vue
const blogs = [
  {
    id: 1,
    title: 'Program Pengelolaan Sampah berbasis Masyarakat',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=400&q=80',
    alt: 'Blog 1',
    summary: 'Program inovatif yang melibatkan masyarakat dalam pengelolaan sampah untuk lingkungan yang lebih bersih dan sehat.',
    date: '2026-01-10',
    author: 'Ayu Lestari',
    content: 'Ini adalah isi lengkap blog tentang program pengelolaan sampah berbasis masyarakat. Konten bisa sangat panjang dan detail.'
  },
  {
    id: 2,
    title: 'Pengelolaan Sampah Berbasis Masyarakat',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80',
    alt: 'Blog 2',
    summary: 'Bagaimana komunitas lokal dapat berperan aktif dalam mengurangi limbah dan meningkatkan daur ulang.',
    date: '2026-01-15',
    author: 'Budi Santoso',
    content: 'Isi lengkap blog tentang pengelolaan sampah berbasis masyarakat. Penjelasan, tips, dan studi kasus.'
  },
  {
    id: 3,
    title: 'Akibat Teknologi dalam Pelestarian Lingkungan',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=400&q=80',
    alt: 'Blog 3',
    summary: 'Teknologi modern membawa dampak positif dan negatif bagi pelestarian lingkungan. Simak ulasannya di sini.',
    date: '2026-01-20',
    author: 'Citra Dewi',
    content: 'Isi lengkap blog tentang dampak teknologi dalam pelestarian lingkungan. Analisis dan opini.'
  }
]

onMounted(() => {
  const blogId = Number(route.params.id)
  selectedBlog.value = blogs.find(b => b.id === blogId) || null
})
</script>
