<template>
  <div v-if="isOpen" class="fixed inset-0 bg-white z-50 overflow-y-auto">
    <div class="container mx-auto px-6 py-8">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold">Manajemen Blog</h2>
        <div class="flex gap-4">
          <button @click="openCreateForm" class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            + Buat Blog Baru
          </button>
          <button @click="close" class="text-gray-500 hover:text-gray-700">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Blog List -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div v-for="blog in blogs" :key="blog.id" class="bg-white rounded-lg shadow-lg overflow-hidden">
          <img :src="blog.image" alt="Blog" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h3 class="font-bold text-lg mb-2">{{ blog.title }}</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ blog.excerpt }}</p>
            <div class="flex gap-2">
              <button @click="viewBlog(blog)" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                Lihat
              </button>
              <button @click="editBlog(blog)" class="flex-1 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm">
                Edit
              </button>
              <button @click="deleteBlog(blog.id)" class="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Create/Edit Form -->
      <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closeForm">
        <div class="bg-white rounded-lg max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
          <h3 class="text-2xl font-bold mb-6">{{ editMode ? 'Edit Blog' : 'Buat Blog Baru' }}</h3>
          <form @submit.prevent="saveBlog" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Judul *</label>
              <input v-model="currentBlog.title" type="text" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">URL Gambar *</label>
              <input v-model="currentBlog.image" type="url" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ringkasan *</label>
              <textarea v-model="currentBlog.excerpt" required rows="3" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Konten *</label>
              <textarea v-model="currentBlog.content" required rows="8" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"></textarea>
            </div>
            <div class="flex gap-4">
              <button type="button" @click="closeForm" class="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Batal</button>
              <button type="submit" class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close', 'viewBlog']);

const blogs = ref([
  { id: 1, title: 'Program Pengelolaan Sampah', image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=400&q=80', excerpt: 'Inisiatif pengelolaan sampah berbasis masyarakat...', content: 'Konten lengkap...' },
  { id: 2, title: 'Dampak Perubahan Iklim', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80', excerpt: 'Bagaimana perubahan iklim mempengaruhi...', content: 'Konten lengkap...' },
  { id: 3, title: 'Teknologi Ramah Lingkungan', image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=400&q=80', excerpt: 'Peran teknologi dalam pelestarian...', content: 'Konten lengkap...' },
]);

const showForm = ref(false);
const editMode = ref(false);
const currentBlog = reactive({
  id: null,
  title: '',
  image: '',
  excerpt: '',
  content: ''
});

const openCreateForm = () => {
  editMode.value = false;
  Object.keys(currentBlog).forEach(key => currentBlog[key] = key === 'id' ? null : '');
  showForm.value = true;
};

const editBlog = (blog) => {
  editMode.value = true;
  Object.assign(currentBlog, blog);
  showForm.value = true;
};

const saveBlog = () => {
  if (editMode.value) {
    const index = blogs.value.findIndex(b => b.id === currentBlog.id);
    if (index !== -1) {
      blogs.value[index] = { ...currentBlog };
    }
  } else {
    blogs.value.push({
      id: Date.now(),
      ...currentBlog
    });
  }
  closeForm();
};

const deleteBlog = (id) => {
  if (confirm('Yakin ingin menghapus blog ini?')) {
    blogs.value = blogs.value.filter(b => b.id !== id);
  }
};

const viewBlog = (blog) => {
  emit('viewBlog', blog);
};

const closeForm = () => {
  showForm.value = false;
};

const close = () => {
  emit('close');
};
</script>
