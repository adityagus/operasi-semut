<template>
  <div v-if="isOpen && blog" class="fixed inset-0 bg-white z-50 overflow-y-auto">
    <div class="container mx-auto px-6 py-8 max-w-4xl">
      <div class="flex justify-between items-center mb-8">
        <button @click="close" class="text-gray-500 hover:text-gray-700 flex items-center gap-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Kembali
        </button>
      </div>
      
      <article>
        <img :src="blog.image" alt="Blog" class="w-full h-96 object-cover rounded-lg mb-8" />
        
        <h1 class="text-4xl font-bold mb-4">{{ blog.title }}</h1>
        
        <div class="flex items-center gap-4 text-gray-600 mb-8">
          <span>📅 {{ formatDate(blog.date || new Date()) }}</span>
          <span>👤 Admin Operasi Semut</span>
        </div>
        
        <div class="prose prose-lg max-w-none">
          <p class="text-xl text-gray-600 mb-6">{{ blog.excerpt }}</p>
          <div class="whitespace-pre-line text-gray-700 leading-relaxed">{{ blog.content }}</div>
        </div>
        
        <div class="mt-12 pt-8 border-t">
          <h3 class="text-2xl font-bold mb-6">Artikel Terkait</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="n in 3" :key="n" class="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <img :src="`https://source.unsplash.com/random/400x200?sig=${n}`" alt="Related" class="w-full h-40 object-cover" />
              <div class="p-4">
                <h4 class="font-bold mb-2">Artikel Terkait {{ n }}</h4>
                <p class="text-sm text-gray-600">Deskripsi singkat artikel...</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
  blog: Object
});

const emit = defineEmits(['close']);

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
};

const close = () => {
  emit('close');
};
</script>
