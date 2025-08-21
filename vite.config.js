import { defineConfig } from 'vite'

export default defineConfig({
  root: './',
  server: {
    host: true,  // <-- allow connections on 0.0.0.0
    port: 5173
  },
  build: {
    outDir: 'dist'
  }
})
