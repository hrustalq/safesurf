import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Needed for Docker
    port: parseInt(process.env.PORT || '8080'),
    strictPort: true,
    watch: {
      usePolling: true, // Needed for Docker on Windows/macOS
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          // Add other chunks as needed
        },
      },
      external: ['web-vitals'],
    },
  },
})
