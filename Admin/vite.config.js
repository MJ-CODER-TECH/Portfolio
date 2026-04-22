import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    port: 5173,
    open: true,

    // agar red error overlay band karna ho:
    hmr: {
      overlay: true
      // false karoge to Vite error popup hide ho jayega
    }
  }
})