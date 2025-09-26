import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "bootstrap/scss/bootstrap";`
      }
    }
  },
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  }
})

// const path = require('path')

// export default {
//   root: path.resolve(__dirname, 'src'),
//   server: {
//     port: 8080,
//     hot: true
//   }
// }
