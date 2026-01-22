<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-green-600">404</h1>
      <p class="text-2xl font-semibold text-gray-900 mt-4">Halaman Tidak Ditemukan</p>
      <p class="text-gray-600 mt-2">Maaf, halaman yang Anda cari tidak ada.</p>
      <router-link
        to="/"
        class="inline-block mt-8 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
      >
        Kembali ke Beranda
      </router-link>
    </div>
  </div>
</template>
