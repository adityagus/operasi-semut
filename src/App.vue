<template>
  <div id="app">
    <!-- Loading State -->
    <div v-if="!isReady" class="loading-screen">
      <div class="spinner"></div>
    </div>

    <!-- Main Content - Only show when ready -->
    <template v-else>
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
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const router = useRouter()
const isReady = ref(false)

const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin') || route.path === '/login'
})

const navigateToLogin = () => {
  router.push('/login')
}

onMounted(async () => {
  // Tunggu sampai router dan data siap
  await router.isReady()
  
  // Tambahkan delay minimal untuk UX yang lebih baik (opsional)
  await new Promise(resolve => setTimeout(resolve, 100))
  
  isReady.value = true
})
</script>

<style>
/* Loading Screen */
.loading-screen {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  z-index: 9999;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Existing styles... */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active,
.page-enter-active,
.page-leave-active {
  will-change: opacity, transform;
}
</style>
