<template>
  <div>
    <div v-for="(section, idx) in sections" :key="idx" ref="sectionRefs" class="reveal-section">
      <transition name="fade-up">
        <div v-show="visible[idx]">
          <component :is="section" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import VisiMisiSlider from './VisiMisiSlider.vue';
import AnimatedStat from './AnimatedStat.vue';

const sections = [VisiMisiSlider, AnimatedStat];
const visible = ref([false, false]);
const sectionRefs = ref([]);
let observer = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = sectionRefs.value.indexOf(entry.target);
        if (index !== -1) {
          visible.value[index] = true;
        }
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  sectionRefs.value.forEach(el => {
    if (el) observer.observe(el);
  });
});

onUnmounted(() => {
  if (observer) {
    sectionRefs.value.forEach(el => {
      if (el) observer.unobserve(el);
    });
  }
});
</script>

<style scoped>
.reveal-section {
  margin-bottom: 3rem;
}

.fade-up-enter-active {
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(60px);
}
</style>
