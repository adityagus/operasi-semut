<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="close">
    <div class="bg-white rounded-lg max-w-md w-full p-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-red-600">{{ isLogin ? 'Login' : 'Sign Up' }}</h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div v-if="!isLogin">
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
          <input v-model="form.nama" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent" placeholder="Nama lengkap">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input v-model="form.email" type="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent" placeholder="email@example.com">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password *</label>
          <input v-model="form.password" type="password" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent" placeholder="••••••••">
        </div>
        
        <div v-if="!isLogin">
          <label class="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password *</label>
          <input v-model="form.confirmPassword" type="password" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent" placeholder="••••••••">
        </div>
        
        <button type="submit" class="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold">
          {{ isLogin ? 'Login' : 'Sign Up' }}
        </button>
        
        <div class="text-center">
          <button type="button" @click="toggleMode" class="text-sm text-red-600 hover:text-red-700">
            {{ isLogin ? 'Belum punya akun? Sign Up' : 'Sudah punya akun? Login' }}
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

const emit = defineEmits(['close', 'login', 'signup']);

const isLogin = ref(true);

const form = reactive({
  nama: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const handleSubmit = () => {
  if (!isLogin.value && form.password !== form.confirmPassword) {
    alert('Password tidak cocok!');
    return;
  }
  
  if (isLogin.value) {
    emit('login', { email: form.email, password: form.password });
  } else {
    emit('signup', { ...form });
  }
  
  Object.keys(form).forEach(key => form[key] = '');
  close();
};

const toggleMode = () => {
  isLogin.value = !isLogin.value;
  Object.keys(form).forEach(key => form[key] = '');
};

const close = () => {
  emit('close');
};
</script>
