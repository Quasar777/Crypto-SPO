import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/


// vite.config.js
export default {
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // Укажите адрес вашего API сервера
        changeOrigin: true,  // Изменяет заголовок Origin для запроса
        secure: false,  // Отключить проверку SSL (если API использует http)
        rewrite: (path) => path.replace(/^\/api/, ''), // Если нужно убрать /api из пути
      },
    },
  },
};
