import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useContentStore = defineStore('content', () => {
  const contents = ref({})
  const loading = ref(false)
  const error = ref(null)

  // Load content by section
  const loadContent = (section) => {
    loading.value = true
    try {
      const saved = localStorage.getItem(`content_${section}`)
      if (saved) {
        contents.value[section] = JSON.parse(saved)
      }
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // Save content
  const saveContent = (section, data) => {
    try {
      localStorage.setItem(`content_${section}`, JSON.stringify(data))
      contents.value[section] = data
      return true
    } catch (err) {
      error.value = err.message
      return false
    }
  }

  // Get content by section
  const getContent = (section) => {
    if (!contents.value[section]) {
      loadContent(section)
    }
    return contents.value[section]
  }

  // Blog posts
  const blogs = ref([])
  
  const loadBlogs = () => {
    const saved = localStorage.getItem('blogs')
    if (saved) {
      blogs.value = JSON.parse(saved)
    } else {
      // Default blogs
      blogs.value = [
        {
          id: 1,
          title: 'Memulai Perjalanan Operasi Semut',
          excerpt: 'Bagaimana semuanya dimulai dan visi kami untuk Indonesia',
          content: 'Lorem ipsum dolor sit amet...',
          author: 'Tim Operasi Semut',
          date: '2026-01-20',
          image: 'https://picsum.photos/800/400?random=1',
          status: 'published'
        }
      ]
    }
  }

  const saveBlog = (blog) => {
    if (blog.id) {
      const index = blogs.value.findIndex(b => b.id === blog.id)
      if (index > -1) {
        blogs.value[index] = blog
      }
    } else {
      blog.id = Date.now()
      blogs.value.unshift(blog)
    }
    localStorage.setItem('blogs', JSON.stringify(blogs.value))
  }

  const deleteBlog = (id) => {
    blogs.value = blogs.value.filter(b => b.id !== id)
    localStorage.setItem('blogs', JSON.stringify(blogs.value))
  }

  // Initialize
  loadBlogs()

  return {
    contents,
    loading,
    error,
    loadContent,
    saveContent,
    getContent,
    blogs,
    loadBlogs,
    saveBlog,
    deleteBlog
  }
})
