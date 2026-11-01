import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) {
            return 'vendor-three';
          }
          if (id.includes('jspdf') || id.includes('html2canvas') || id.includes('qrcode')) {
            return 'vendor-pdf-qr';
          }
          if (id.includes('framer-motion') || id.includes('lucide-react') || id.includes('canvas-confetti')) {
            return 'vendor-ui';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
})
