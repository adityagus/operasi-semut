<template>
  <section class="bg-gray-50 py-20">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-12">
      <div class="max-w-xl">
        <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Pelajaran dan Dampak <span class="text-red-600">dari Operasi Semut</span>
        </h1>
        <p class="mb-8 text-gray-600 text-lg">
          Mengubah Lingkungan Dimulai dari Langkah Kecil. Apa yang Bisa Kita Capai dengan Aksi Bersama?
        </p>
        <div class="flex gap-4">
          <button @click="$emit('openRelawan')" class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-all">
            Daftar Relawan
          </button>
          <button @click="$emit('openKolaborasi')" class="px-6 py-3 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white font-semibold transition-all">
            Daftar Kolaborasi
          </button>
        </div>
        <div class="flex gap-2 mt-8">
          <span class="w-2 h-2 bg-red-600 rounded-full"></span>
          <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
          <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
        </div>
      </div>
      <div class="mt-8 md:mt-0">
        <img 
          src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=500&q=80" 
          alt="Aksi Operasi Semut"
          class="rounded-full w-80 h-80 object-cover shadow-2xl" 
        />
      </div>
    </div>
  </section>
</template>

<script setup>
</script>