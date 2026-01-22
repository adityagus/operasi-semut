<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Pengaturan</h1>
    
    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold">Pengaturan Umum</h2>
      </div>
      
      <div class="p-6 space-y-6">
        <!-- Site Settings -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Informasi Situs</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nama Situs</label>
              <input
                v-model="settings.siteName"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
              <textarea
                v-model="settings.siteDescription"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>
          </div>
        </div>
        
        <!-- Instagram Settings -->
        <div class="pt-6 border-t border-gray-200">
          <h3 class="text-lg font-semibold mb-4">Instagram Integration</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Instagram Username</label>
              <input
                v-model="settings.instagramUsername"
                type="text"
                placeholder="@operasemut"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Instagram Access Token</label>
              <input
                v-model="settings.instagramToken"
                type="password"
                placeholder="Enter your access token"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <p class="text-sm text-gray-500 mt-1">
                Dapatkan token dari 
                <a href="https://developers.facebook.com/docs/instagram-basic-display-api" target="_blank" class="text-green-600 hover:underline">
                  Instagram Basic Display API
                </a>
              </p>
            </div>
          </div>
        </div>
        
        <!-- Social Media Settings -->
        <div class="pt-6 border-t border-gray-200">
          <h3 class="text-lg font-semibold mb-4">Social Media</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
              <input
                v-model="settings.facebookUrl"
                type="url"
                placeholder="https://facebook.com/operasemut"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
              <input
                v-model="settings.twitterUrl"
                type="url"
                placeholder="https://twitter.com/operasemut"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
              <input
                v-model="settings.linkedinUrl"
                type="url"
                placeholder="https://linkedin.com/company/operasemut"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>
        
        <div class="pt-6">
          <button
            @click="saveSettings"
            class="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
          >
            Simpan Pengaturan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const settings = ref({
  siteName: 'Operasi Semut',
  siteDescription: 'Bergerak Bersama untuk Indonesia',
  instagramUsername: '@operasemut',
  instagramToken: '',
  facebookUrl: '',
  twitterUrl: '',
  linkedinUrl: ''
})

onMounted(() => {
  // Load settings from localStorage or API
  const saved = localStorage.getItem('siteSettings')
  if (saved) {
    settings.value = JSON.parse(saved)
  }
})

const saveSettings = () => {
  localStorage.setItem('siteSettings', JSON.stringify(settings.value))
  alert('Pengaturan berhasil disimpan!')
}
</script>
