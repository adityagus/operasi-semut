<template>
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4">
      <div class="relative w-full max-w-3xl mx-auto">
        <transition name="slide" mode="out-in">
          <div :key="current" class="p-8 bg-gray-50 rounded-lg shadow text-center">
            <img :src="visiMisi[current].img" class="mx-auto mb-4 w-32 h-32 object-cover rounded-full shadow" :alt="visiMisi[current].title" />
            <h2 class="text-3xl font-bold mb-4 text-red-600">{{ visiMisi[current].title }}</h2>
            <p class="text-gray-600 whitespace-pre-line">{{ visiMisi[current].desc }}</p>
          </div>
        </transition>
        <div class="flex justify-center gap-4 mt-6">
          <button 
            v-for="(item, idx) in visiMisi" 
            :key="idx" 
            @click="current = idx" 
            :class="['w-3 h-3 rounded-full transition-all', current === idx ? 'bg-red-600 scale-125' : 'bg-gray-300 hover:bg-gray-400']"
            :aria-label="item.title"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const visiMisi = [
  {
    title: 'Visi',
    desc: 'Menjadi pelopor gerakan nasional yang menginspirasi masyarakat Indonesia untuk menjaga kebersihan dan kelestarian lingkungan melalui aksi kolektif, inovasi, dan edukasi berkelanjutan.',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Misi',
    desc: '1. Mengedukasi masyarakat tentang pentingnya kebersihan lingkungan\n2. Mendorong aksi nyata melalui kolaborasi lintas komunitas dan sektor\n3. Mengembangkan inovasi pengelolaan sampah dan daur ulang\n4. Membentuk budaya peduli lingkungan yang berkelanjutan',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
];

const current = ref(0);
let interval = null;

onMounted(() => {
  interval = setInterval(() => {
    current.value = (current.value + 1) % visiMisi.length;
  }, 5000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
