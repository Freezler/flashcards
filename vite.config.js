/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    // Compress assets for production
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    // Bundle analyzer (only in analyze mode)
    process.env.ANALYZE && visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),

  // SEO optimalisaties
  define: {
    'process.env.VITE_SITE_URL': JSON.stringify(
      'https://nederlandse-flashcards.vercel.app'
    ),
    'process.env.VITE_SITE_NAME': JSON.stringify('Nederlandse Flashcards'),
  },

  // Performance optimizations
  build: {
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize chunk sizes
    rollupOptions: {
      output: {
        // Enhanced manual chunk splitting for better caching
        manualChunks: id => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('react-router')) {
              return 'router'
            }
            if (id.includes('fuse.js')) {
              return 'search-vendor'
            }
            return 'vendor'
          }
          
          // Context chunks
          if (id.includes('/src/contexts/')) {
            return 'contexts'
          }
          
          // Component chunks
          if (id.includes('/src/components/')) {
            return 'components'
          }
          
          // Page chunks
          if (id.includes('/src/pages/')) {
            return 'pages'
          }
          
          // Utils chunks
          if (id.includes('/src/utils/') || id.includes('/src/hooks/')) {
            return 'utils'
          }
        },
        // Optimize asset file names
        assetFileNames: assetInfo => {
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
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // Enhanced minification
    minify: 'esbuild',
    // Source maps for debugging (disabled for production)
    sourcemap: false,
    // Target modern browsers for smaller bundles
    target: 'esnext',
    // Additional optimizations
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
  },

  // Development server optimizations
  server: {
    // Keep it simple for development
    port: 5173,
    open: true,
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
