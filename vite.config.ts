import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rolldownOptions: {
      input: {
        landing: resolve(root, 'index.html'),
        tienda: resolve(root, 'store/index.html'),
        administracion: resolve(root, 'store/admin/index.html'),
      },
    },
  },
})
