<template>
  <div id="app">
    <!-- Show Navbar only on non-admin routes -->
    <Transition name="fade" mode="out-in">
      <Navbar 
        v-if="!isAdminRoute"
        @openLogin="navigateToLogin"
      />
    </Transition>
    
    <!-- Router View with Transition -->
    <router-view v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <KeepAlive :include="['HomeView']">
          <component :is="Component" :key="route.path" />
        </KeepAlive>
      </Transition>
    </router-view>
    
    <!-- Show Footer only on non-admin routes -->
    <Transition name="fade" mode="out-in">
      <Footer v-if="!isAdminRoute" />
    </Transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const router = useRouter()

const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin') || route.path === '/login'
})

const navigateToLogin = () => {
  router.push('/login')
}
</script>

<style>
/* Prevent layout shift */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Smooth page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Fade transitions for navbar/footer */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Prevent content jump */
.fade-enter-active,
.fade-leave-active,
.page-enter-active,
.page-leave-active {
  will-change: opacity, transform;
}
</style>
