import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      "!": path.resolve("./public/"),
      "@": path.resolve("./src/"),
    }
  }
})
