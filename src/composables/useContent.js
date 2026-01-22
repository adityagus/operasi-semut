import { ref } from 'vue'

export function useContent() {
  const content = ref({})
  const loading = ref(false)
  const error = ref(null)

  const fetchContent = async (section) => {
    loading.value = true
    error.value = null

    try {
      // In production, fetch from API
      // const response = await axios.get(`/api/content/${section}`)
      
      // For now, load from localStorage
      const saved = localStorage.getItem(`content_${section}`)
      if (saved) {
        content.value = JSON.parse(saved)
      } else {
        content.value = getDefaultContent(section)
      }
      
      return content.value
    } catch (err) {
      error.value = err.message
      content.value = getDefaultContent(section)
    } finally {
      loading.value = false
    }
  }

  const saveContent = async (section, data) => {
    loading.value = true
    error.value = null

    try {
      // In production, save to API
      // await axios.post(`/api/content/${section}`, data)
      
      // For now, save to localStorage
      localStorage.setItem(`content_${section}`, JSON.stringify(data))
      content.value = data
      
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const getDefaultContent = (section) => {
    const defaults = {
      hero: {
        title: 'Bergerak Bersama untuk Indonesia',
        subtitle: 'Jadilah bagian dari perubahan nyata',
        description: 'Operasi Semut adalah gerakan sosial yang mengajak seluruh masyarakat untuk bersama-sama membuat perubahan positif'
      },
      visi: {
        visi: 'Menjadi gerakan sosial terdepan dalam memberdayakan masyarakat',
        misi: [
          'Membangun kesadaran sosial',
          'Memberdayakan komunitas lokal',
          'Menciptakan dampak berkelanjutan'
        ]
      },
      statistik: {
        relawan: 1234,
        kolaborasi: 45,
        beneficiary: 5678,
        provinsi: 24
      }
    }
    
    return defaults[section] || {}
  }

  return {
    content,
    loading,
    error,
    fetchContent,
    saveContent,
    getDefaultContent
  }
}
