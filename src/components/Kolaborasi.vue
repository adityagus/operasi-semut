<template>
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-center text-2xl font-bold mb-8">Kolaborasi Kami</h2>
      <p class="text-center text-gray-500 mb-8">Kami telah meraih kolaborasi dengan 20+ perusahaan dan yayasan</p>
      <div class="flex flex-wrap justify-center gap-8">
        <img v-for="n in 6" :key="n" :src="`https://source.unsplash.com/random/120x48?sig=${n}`" alt="Logo Kolaborasi" class="w-24 h-12 object-contain rounded bg-gray-100" />
      </div>
    </div>
  </section>
</template>
<script setup>
</script>
 