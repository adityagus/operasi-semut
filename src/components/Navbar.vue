<template>
  <nav class="bg-white shadow p-4 flex items-center justify-between px-4 md:px-16 relative">
    <div class="font-bold text-lg text-red-600 flex items-center">
      <img
        src="/assets/logo.png"
        alt="Operasi Semut"
        class="h-8 mr-2 rounded-full" />
    </div>
    <!-- Hamburger Button (Mobile) -->
    <button
      class="md:hidden flex items-center px-2 py-1 border rounded text-red-600 border-red-600 focus:outline-none"
      @click="isOpen = !isOpen"
      aria-label="Toggle menu"
    >
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
    <!-- Menu Items (Desktop) -->
    <div class="hidden md:flex space-x-6">
      <a href="#" class="hover:text-red-600">Home</a>
      <a href="#" class="hover:text-red-600">Service</a>
      <a href="#" class="hover:text-red-600">Visi</a>
      <a href="#" class="hover:text-red-600">Testimoni</a>
      <a href="#" class="hover:text-red-600">FAQ</a>
      <button @click="$emit('openBlog')" class="hover:text-red-600">Blog</button>
    </div>
    <div class="hidden md:flex space-x-2">
      <button @click="$emit('openLogin')" class="px-4 py-1 border rounded text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-all">Login</button>
      <button @click="$emit('openLogin')" class="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-all">Sign up</button>
    </div>
    <!-- Mobile Menu -->
    <transition name="fade">
      <div
        v-if="isOpen"
        class="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 z-50 md:hidden"
      >
        <a href="#" class="hover:text-red-600" @click="isOpen = false">Home</a>
        <a href="#" class="hover:text-red-600" @click="isOpen = false">Service</a>
        <a href="#" class="hover:text-red-600" @click="isOpen = false">Visi</a>
        <a href="#" class="hover:text-red-600" @click="isOpen = false">Testimoni</a>
        <a href="#" class="hover:text-red-600" @click="isOpen = false">FAQ</a>
        <button @click="$emit('openBlog'); isOpen = false" class="hover:text-red-600">Blog</button>
        <div class="flex flex-col space-y-2 w-full px-4">
          <button @click="$emit('openLogin'); isOpen = false" class="w-full px-4 py-1 border rounded text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-all">Login</button>
          <button @click="$emit('openLogin'); isOpen = false" class="w-full px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-all">Sign up</button>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>