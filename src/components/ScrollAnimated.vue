<template>
  <div ref="sectionRef" class="scroll-animated" :class="`animation-${animation}`">
    <transition :name="animation">
      <div v-show="isVisible" class="animated-content">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  animation: {
    type: String,
    default: 'fade-up',
    validator: (value) => ['fade-up', 'fade-down', 'fade-left', 'fade-right', 'zoom-in', 'fade'].includes(value)
  },
  delay: {
    type: Number,
    default: 0
  },
  threshold: {
    type: Number,
    default: 0.1
  }
});

const sectionRef = ref(null);
const isVisible = ref(false);
let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (props.delay > 0) {
            setTimeout(() => {
              isVisible.value = true;
            }, props.delay);
          } else {
            isVisible.value = true;
          }
        }
      });
    },
    { 
      threshold: props.threshold,
      rootMargin: '0px 0px -80px 0px'
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
  will-change: transform, opacity;
}

.animated-content {
  width: 100%;
}

/* Fade Up Animation */
.fade-up-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Fade Down Animation */
.fade-down-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-down-enter-from {
  opacity: 0;
  transform: translateY(-40px);
}

.fade-down-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Fade Left Animation */
.fade-left-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-left-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}

.fade-left-enter-to {
  opacity: 1;
  transform: translateX(0);
}

/* Fade Right Animation */
.fade-right-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-right-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.fade-right-enter-to {
  opacity: 1;
  transform: translateX(0);
}

/* Zoom In Animation */
.zoom-in-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.zoom-in-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.zoom-in-enter-to {
  opacity: 1;
  transform: scale(1);
}

/* Fade Animation */
.fade-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}
</style>
