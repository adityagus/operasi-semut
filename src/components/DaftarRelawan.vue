<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="close">
    <div class="bg-white rounded-lg max-w-md w-full p-8 max-h-[90vh] overflow-y-auto scrollbar-hide">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-red-600">Daftar Relawan</h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
          <input v-model="form.nama" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent" placeholder="Nama lengkap Anda">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input v-model="form.email" type="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent" placeholder="email@example.com">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">No. WhatsApp *</label>
          <input v-model="form.whatsapp" type="tel" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent" placeholder="08123456789">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Kota *</label>
          <input v-model="form.kota" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent" placeholder="Kota tempat tinggal">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Motivasi Bergabung *</label>
          <textarea v-model="form.motivasi" required rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent" placeholder="Ceritakan motivasi Anda bergabung..."></textarea>
        </div>
        
        <div class="flex gap-4 pt-4">
          <button type="button" @click="close" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Batal
          </button>
          <button type="submit" class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Daftar Sekarang
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close', 'submit']);

const form = reactive({
  nama: '',
  email: '',
  whatsapp: '',
  kota: '',
  motivasi: ''
});

const handleSubmit = () => {
  emit('submit', { ...form });
  // Reset form
  Object.keys(form).forEach(key => form[key] = '');
  close();
};

const close = () => {
  emit('close');
};
</script>
