import { ref, onMounted } from 'vue'
import axios from 'axios'

export function useInstagram() {
  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)
  const username = ref('')

  const fetchInstagramPosts = async (accessToken, limit = 12) => {
    loading.value = true
    error.value = null

    try {
      // Instagram Basic Display API
      const response = await axios.get(
        `https://graph.instagram.com/me/media`,
        {
          params: {
            fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp',
            access_token: accessToken,
            limit: limit
          }
        }
      )

      posts.value = response.data.data
      return posts.value
    } catch (err) {
      error.value = err.message || 'Failed to fetch Instagram posts'
      console.error('Instagram API Error:', err)
      
      // Fallback to mock data for demo
      posts.value = generateMockPosts(limit)
      return posts.value
    } finally {
      loading.value = false
    }
  }

  const fetchUserInfo = async (accessToken) => {
    try {
      const response = await axios.get(
        `https://graph.instagram.com/me`,
        {
          params: {
            fields: 'id,username',
            access_token: accessToken
          }
        }
      )
      username.value = response.data.username
      return response.data
    } catch (err) {
      console.error('Failed to fetch user info:', err)
      username.value = 'operasemut'
    }
  }

  // Mock data untuk demo (jika API gagal)
  const generateMockPosts = (count = 12) => {
    const mockPosts = []
    for (let i = 1; i <= count; i++) {
      mockPosts.push({
        id: `mock_${i}`,
        caption: `Post Instagram #${i} - Bersama kita bisa membuat perubahan! 🌱 #OperasiSemut #Indonesia`,
        media_type: 'IMAGE',
        media_url: `https://picsum.photos/400/400?random=${i}`,
        permalink: 'https://www.instagram.com/p/example',
        timestamp: new Date(Date.now() - i * 86400000).toISOString()
      })
    }
    return mockPosts
  }

  return {
    posts,
    loading,
    error,
    username,
    fetchInstagramPosts,
    fetchUserInfo,
    generateMockPosts
  }
}
