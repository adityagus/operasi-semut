<template>
  <div ref="sectionRef" class="scroll-animated">
    <transition name="fade-up">
      <div v-show="isVisible">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const sectionRef = ref(null);
const isVisible = ref(false);
let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible.value = true;
        }
      });
    },
    { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );
  
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

<style scoped>
.scroll-animated {
  margin-bottom: 0;
}

.fade-up-enter-active {
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(60px);
}
</style>
