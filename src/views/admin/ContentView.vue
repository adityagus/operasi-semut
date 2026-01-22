<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Kelola Konten</h1>
      <button
        @click="showAddModal = true"
        class="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
      >
        + Tambah Konten
      </button>
    </div>
    
    <!-- Tabs -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="py-4 px-1 border-b-2 font-medium text-sm"
          :class="activeTab === tab.id 
            ? 'border-green-500 text-green-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>
    
    <!-- Content List -->
    <div class="bg-white rounded-lg shadow">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Judul
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Section
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Terakhir Diubah
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in filteredContent" :key="item.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ item.title }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ item.section }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="item.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'"
                >
                  {{ item.status === 'published' ? 'Dipublikasi' : 'Draft' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ item.updatedAt }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="editContent(item)" class="text-indigo-600 hover:text-indigo-900 mr-4">
                  Edit
                </button>
                <button @click="deleteContent(item.id)" class="text-red-600 hover:text-red-900">
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Add/Edit Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 class="text-2xl font-bold mb-6">{{ editingItem ? 'Edit Konten' : 'Tambah Konten Baru' }}</h2>
        
        <form @submit.prevent="saveContent" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Section</label>
            <select
              v-model="formData.section"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="hero">Hero</option>
              <option value="visi">Visi & Misi</option>
              <option value="statistik">Statistik</option>
              <option value="testimoni">Testimoni</option>
              <option value="faq">FAQ</option>
              <option value="instagram">Instagram</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Judul</label>
            <input
              v-model="formData.title"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Konten</label>
            <textarea
              v-model="formData.content"
              rows="6"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="formData.status"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Dipublikasi</option>
            </select>
          </div>
          
          <div class="flex space-x-4 pt-4">
            <button
              type="submit"
              class="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
            >
              Simpan
            </button>
            <button
              type="button"
              @click="closeModal"
              class="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useContentStore } from '@/stores/content'

const contentStore = useContentStore()

const activeTab = ref('all')
const showAddModal = ref(false)
const editingItem = ref(null)

const tabs = [
  { id: 'all', label: 'Semua' },
  { id: 'hero', label: 'Hero' },
  { id: 'visi', label: 'Visi & Misi' },
  { id: 'testimoni', label: 'Testimoni' }
]

const formData = ref({
  section: 'hero',
  title: '',
  content: '',
  status: 'draft'
})

// Mock data - in production, fetch from store/API
const contentList = ref([
  { id: 1, title: 'Hero Banner', section: 'hero', status: 'published', updatedAt: '22 Jan 2026' },
  { id: 2, title: 'Visi Organisasi', section: 'visi', status: 'published', updatedAt: '21 Jan 2026' },
  { id: 3, title: 'Testimoni User 1', section: 'testimoni', status: 'draft', updatedAt: '20 Jan 2026' }
])

const filteredContent = computed(() => {
  if (activeTab.value === 'all') return contentList.value
  return contentList.value.filter(item => item.section === activeTab.value)
})

const editContent = (item) => {
  editingItem.value = item
  formData.value = { ...item }
  showAddModal.value = true
}

const deleteContent = (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus konten ini?')) {
    const index = contentList.value.findIndex(item => item.id === id)
    if (index > -1) {
      contentList.value.splice(index, 1)
    }
  }
}

const saveContent = () => {
  if (editingItem.value) {
    const index = contentList.value.findIndex(item => item.id === editingItem.value.id)
    if (index > -1) {
      contentList.value[index] = { ...formData.value, updatedAt: new Date().toLocaleDateString('id-ID') }
    }
  } else {
    contentList.value.push({
      id: Date.now(),
      ...formData.value,
      updatedAt: new Date().toLocaleDateString('id-ID')
    })
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  editingItem.value = null
  formData.value = {
    section: 'hero',
    title: '',
    content: '',
    status: 'draft'
  }
}
</script>
