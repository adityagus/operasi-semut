<template>
  <section ref="sectionRef" class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold text-center mb-8">Statistik Operasi Semut</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div v-for="(stat, idx) in stats" :key="idx">
          <div class="text-3xl font-bold text-red-600 mb-2">
            <span>{{ stat.displayValue }}</span>
          </div>
          <div class="text-gray-500">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

const sectionRef = ref(null);
const stats = reactive([
  { label: 'Anggota', value: 2245341, displayValue: '0', animated: false },
  { label: 'Total Sampah Terkumpul (Kg)', value: 46328, displayValue: '0', animated: false },
  { label: 'Lokasi yang Sudah Dibersihkan', value: 828867, displayValue: '0', animated: false },
  { label: 'Kolaborasi', value: 1926436, displayValue: '0', animated: false },
]);

function animateValue(stat, duration = 2000) {
  if (stat.animated) return;
  stat.animated = true;
  
  const start = 0;
  const end = stat.value;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeOutQuad = progress * (2 - progress);
    const current = Math.floor(easeOutQuad * (end - start) + start);
    
    stat.displayValue = current.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stats.forEach(stat => animateValue(stat));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onUnmounted(() => {
  if (observer && sectionRef.value) {
    observer.unobserve(sectionRef.value);
  }
});
</script>
