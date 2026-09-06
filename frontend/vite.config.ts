import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite configuration — Tailwind v4 uses the vite plugin (no tailwind.config needed)
export default defineConfig({
  plugins: [
    tailwindcss(), // Process Tailwind utility classes
    react(),       // React JSX/TSX support
  ],
})
