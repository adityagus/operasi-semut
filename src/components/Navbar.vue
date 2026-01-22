<template>
  <nav class="bg-white shadow p-4 flex justify-between items-center px-16">
    <div class="font-bold text-lg text-red-600 flex items-center">
      <img
        src="@/assets/logo.png" 
        alt="Operasi Semut"
        class="h-8 mr-2 rounded-full" />
      <!-- Operasi Semut -->
    </div>
    <div class="space-x-6">
      <a href="#" class="hover:text-red-600">Home</a>
      <a href="#" class="hover:text-red-600">Service</a>
      <a href="#" class="hover:text-red-600">Visi</a>
      <a href="#" class="hover:text-red-600">Testimoni</a>
      <a href="#" class="hover:text-red-600">FAQ</a>
      <button @click="$emit('openBlog')" class="hover:text-red-600">Blog</button>
    </div>
    <div class="space-x-2">
      <button @click="$emit('openLogin')" class="px-4 py-1 border rounded text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-all">Login</button>
      <button @click="$emit('openLogin')" class="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-all">Sign up</button>
    </div>
  </nav>
</template>

<script setup>
</script>