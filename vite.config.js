import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/charge-tap-landing/' // Базовий шлях для GitHub Pages (має відповідати назві репозиторію)
})
