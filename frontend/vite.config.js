import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Chạy ở http://localhost:3000 như đề bài
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  preview: { port: 3000 },
})
