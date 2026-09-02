import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import previewPlugin from './plugins/previewPlugin.js'

export default defineConfig({
  plugins: [
    react(),
    previewPlugin()
  ],
  server: {
    allowedHosts: true,
    hmr: {
      clientPort: 443
    }
  }
})