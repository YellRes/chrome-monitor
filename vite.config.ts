import { defineConfig } from 'vite'
import  path from 'path'
import react from '@vitejs/plugin-react'
import copy from 'vite-plugin-cp'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
// 如何判断当前插件在开发环境或者生产环境使用
export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        contentPage: path.resolve(__dirname, 'src/Content.tsx'),
        content: path.resolve(__dirname, 'src/content/index.ts'),
        popup: path.resolve(__dirname, 'src/popup/index.html'),
        background: path.resolve(__dirname, 'src/background.ts'),
      },
      output: {
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'js/[name].js',
        entryFileNames: '[name].js',
        name: '[name].js',
        format: 'cjs'
      },
      plugins: [
      ]
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  define: {
    'process.env.NODE_ENV': null
  },
  plugins: [
    react(),
    {
      ...copy({
        targets: [
          {
            src: ['./manifest.json'],
            dest: 'dist'
          },
        ],
      }),
      apply: 'build',
      enforce: 'post'
    },
    
    svgr()
  ],
})
