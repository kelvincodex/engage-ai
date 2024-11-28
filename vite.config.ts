import {defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig( ({ mode }) => {

  console.log('defineConfig mode:', mode)

  return {
    plugins: [
      react(),
      svgr({include: '**/*.svg'}),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@/assets': path.resolve(__dirname, './src/assets'),
      },
    },
    server: {
      headers: {
        'Service-Worker-Allowed': '/',
      },
      proxy: {
        '/api': {
          target: 'https://vebvd2628i.execute-api.us-east-1.amazonaws.com/Prod',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          'firebase-messaging-sw': path.resolve(__dirname, 'public/firebase-messaging-sw.js'),
        },
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
    },
  }
})