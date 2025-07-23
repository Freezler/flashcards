/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  
  // SEO optimalisaties
  define: {
    'process.env.VITE_SITE_URL': JSON.stringify('https://nederlandse-flashcards.vercel.app'),
    'process.env.VITE_SITE_NAME': JSON.stringify('Nederlandse Flashcards'),
  },
  
  // Performance optimizations
  build: {
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize chunk sizes
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'contexts': ['./src/contexts/CardContext.tsx', './src/contexts/AuthContext.tsx']
        },
        // Optimize asset file names
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/css/i.test(ext)) {
            return `assets/styles/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    // Minimize for production
    minify: 'esbuild',
    // Source maps for debugging
    sourcemap: false,
    // Target modern browsers for smaller bundles
    target: 'esnext'
  },
  
  // Development server optimizations
  server: {
    // Keep it simple for development
    port: 5173,
    open: true
  },
  
  
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
