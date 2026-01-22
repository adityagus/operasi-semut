<template>
  <div v-if="isOpen" class="fixed inset-0 bg-white z-50 overflow-y-auto">
    <div class="container mx-auto px-6 py-8">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold">Semua Kolaborasi Kami</h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        <div v-for="n in 24" :key="n" class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <img :src="`https://source.unsplash.com/random/200x200?sig=${n}`" alt="Logo" class="w-full h-32 object-contain mb-4" />
          <h3 class="font-bold text-center">Partner {{ n }}</h3>
          <p class="text-sm text-gray-600 text-center mt-2">Kolaborasi sejak 2024</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>
