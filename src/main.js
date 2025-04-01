import { createApp } from 'vue';
import App from './app.vue';
import router from './router';  // Подключаем маршрутизатор
import './style.css';  // Общие стили для проекта

const app = createApp(App);
app.use(router);  // Устанавливаем Vue Router для использования в приложении
app.mount('#app');  // Монтируем приложение в элемент с id="app"
