<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row gap-12 items-center">
        <div class="flex-1">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <div class="flex items-start gap-6">
              <img 
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=200&q=80" 
                alt="Smith" 
                class="w-24 h-24 rounded-full object-cover flex-shrink-0" 
              />
              <div>
                <p class="text-gray-600 mb-4 text-lg leading-relaxed">
                  Inisiatif seperti Operasi Semut menunjukkan bahwa perubahan besar dimulai dari langkah kecil. Kegiatan ini bukan hanya membersihkan lingkungan, tapi juga menanamkan kesadaran pentingnya pengelolaan sampah yang bertanggung jawab.
                </p>
                <div class="font-bold text-lg">Smith</div>
                <div class="text-sm text-gray-500">Head Of Waste 4change</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1">
          <div class="flex flex-wrap gap-6 items-center justify-center">
            <img src="https://source.unsplash.com/random/100x40?sig=1" alt="Logo 1" class="h-10 object-contain grayscale hover:grayscale-0 transition" />
            <img src="https://source.unsplash.com/random/100x40?sig=2" alt="Logo 2" class="h-10 object-contain grayscale hover:grayscale-0 transition" />
            <img src="https://source.unsplash.com/random/100x40?sig=3" alt="Logo 3" class="h-10 object-contain grayscale hover:grayscale-0 transition" />
            <img src="https://source.unsplash.com/random/100x40?sig=4" alt="Logo 4" class="h-10 object-contain grayscale hover:grayscale-0 transition" />
            <img src="https://source.unsplash.com/random/100x40?sig=5" alt="Logo 5" class="h-10 object-contain grayscale hover:grayscale-0 transition" />
            <img src="https://source.unsplash.com/random/100x40?sig=6" alt="Logo 6" class="h-10 object-contain grayscale hover:grayscale-0 transition" />
          </div>
          <div class="text-center mt-6">
            <button @click="$emit('openCollaborations')" class="text-red-600 font-semibold hover:text-red-700">Meet all collaborations →</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
