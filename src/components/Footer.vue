<template>
  <footer class="bg-gray-900 text-white py-10 mt-12">
    <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <div class="font-bold text-lg mb-2 flex items-center"><img src="@/assets/logo.png" alt="Operasi Semut" class="h-8 mr-2 rounded-full"/>Operasi Semut</div>
        <div class="text-xs text-gray-400">Copyright &copy; 2026 Operasi Semut.<br/>All rights reserved.</div>
        <div class="flex space-x-2 mt-2">
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
        </div>
      </div>
      <div>
        <div class="font-bold mb-2">Operasi Semut</div>
        <ul class="text-sm text-gray-400 space-y-1">
          <li><a href="#">About us</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contact us</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Testimonials</a></li>
        </ul>
      </div>
      <div>
        <div class="font-bold mb-2">Support</div>
        <ul class="text-sm text-gray-400 space-y-1">
          <li><a href="#">Help center</a></li>
          <li><a href="#">Terms of service</a></li>
          <li><a href="#">Legal</a></li>
          <li><a href="#">Privacy policy</a></li>
          <li><a href="#">Status</a></li>
        </ul>
      </div>
      <div>
        <div class="font-bold mb-2">Stay up to date</div>
        <input type="email" placeholder="Your email address" class="w-full px-3 py-2 rounded text-gray-900" />
        <button class="mt-2 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Subscribe</button>
      </div>
    </div>
  </footer>
</template>
<script setup>
</script>
