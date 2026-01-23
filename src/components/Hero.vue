<template>
  <section class="relative bg-gray-50 md:py-24 overflow-hidden">
    <!-- Carousel Container -->
    <div class="relative">
      <!-- Slides -->
      <Transition name="slide" mode="out-in">
        <div :key="currentSlide" class="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 hero-slide-fixed-height">
          <!-- Content -->
          <div class="max-w-xl w-full text-center md:text-left">
            <transition name="fade-text" mode="out-in">
              <h1 :key="'title-' + currentSlide" class="text-3xl md:text-5xl font-bold mb-3 md:mb-6 leading-tight text-center md:text-left">
                {{ slides[currentSlide].title }} <span class="text-red-600">{{ slides[currentSlide].highlight }}</span>
              </h1>
            </transition>
            <transition name="fade-text" mode="out-in">
              <p :key="'desc-' + currentSlide" class="mb-8 text-gray-600 text-md text-center md:text-left">
                {{ slides[currentSlide].description }}
              </p>
            </transition>
            <div :key="'btns-' + currentSlide" class="flex gap-4 justify-center md:justify-start">
              <button @click="$emit('openRelawan')" class="px-4 py-2 md:px-6 md:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-all transform hover:scale-105">
                Daftar Relawan
              </button>
              <button @click="$emit('openKolaborasi')" class="px-4 py-2 md:px-6 md:py-3 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white font-semibold transition-all transform hover:scale-105">
                Daftar Kolaborasi
              </button>
            </div>
          </div>
          <!-- Image -->
          <div class="md:mt-0 relative">
            <transition name="fade-img" mode="out-in">
              <img 
                :key="'img-' + currentSlide"
                :src="`/assets/carousel-${currentSlide + 1}.png`" 
                :alt="slides[currentSlide].alt"
                class="w-64 h-64 md:w-full md:h-full object-cover transition-transform duration-500 hover:scale-105" 
              />
            </transition>
          </div>
        </div>
      </Transition>

      <!-- Navigation Arrows -->
      <!-- <button 
        @click="prevSlide" 
        class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10 hidden md:block"
        aria-label="Previous slide"
      >
        <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        @click="nextSlide" 
        class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10 hidden md:block"
        aria-label="Next slide"
      >
        <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button> -->
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
let autoPlayInterval = null

const slides = [
  {
    title: 'Pelajaran dan Dampak',
    highlight: 'dari Operasi Semut',
    description: 'Mengubah Lingkungan Dimulai dari Langkah Kecil. Apa yang Bisa Kita Capai dengan Aksi Bersama?',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=500&q=80',
    alt: 'Aksi Operasi Semut'
  },
  {
    title: 'Bergabunglah dalam',
    highlight: 'Gerakan Perubahan',
    description: 'Bersama-sama kita dapat membuat perbedaan nyata untuk lingkungan dan masyarakat yang lebih baik.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=500&q=80',
    alt: 'Gerakan Bersama'
  },
  {
    title: 'Wujudkan Dampak',
    highlight: 'Nyata Bersama',
    description: 'Dari aksi kecil hingga perubahan besar. Mari berkontribusi untuk masa depan yang berkelanjutan.',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=500&q=80',
    alt: 'Dampak Nyata'
  }
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.length - 1 : currentSlide.value - 1
}

const goToSlide = (index) => {
  currentSlide.value = index
  resetAutoPlay()
}

const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    nextSlide()
  }, 5000) // Change slide every 5 seconds
}

const resetAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
  }
  startAutoPlay()
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
  }
})
</script>

<style scoped>
/* Prevent layout shift: fix min-height to the max slide height */
.hero-slide-fixed-height {
  min-height: 420px; /* Sesuaikan dengan tinggi maksimal konten/gambar carousel */
}
/* Slide Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* Fade Text Transitions */
.fade-text-enter-active, .fade-text-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-text-enter-from, .fade-text-leave-to {
  opacity: 0;
}
.fade-text-enter-to, .fade-text-leave-from {
  opacity: 1;
}

/* Fade Image Transitions */
.fade-img-enter-active, .fade-img-leave-active {
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-img-enter-from, .fade-img-leave-to {
  opacity: 0;
}
.fade-img-enter-to, .fade-img-leave-from {
  opacity: 1;
}
</style>