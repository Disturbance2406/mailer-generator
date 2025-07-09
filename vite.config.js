import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Allows '@/components/Component' imports
    },
  },
  build: {
    outDir: 'dist', // Vercel default
    emptyOutDir: true, // Clean dist folder before build
  },
})
