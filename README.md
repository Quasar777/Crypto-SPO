# Крипто Блокнот

Проект для демо-трейдинга криптовалютами с возможностью тренировки торговых стратегий без риска потери реальных средств.

## Возможности
- Торговля криптовалютами в демо-режиме
- Работа с актуальными курсами в реальном времени
- Система авторизации пользователей
- Анализ торговой истории
- Тестирование торговых стратегий

## Установка и запуск

### Требования
- Node.js (рекомендуется LTS версия)
- npm
- Файл конфигурации .env в корне проекта

1. Установка зависимостей:
```bash
cd frontend && npm install
cd ../server && npm install
cd ../authServer && npm install
```

2. Сборка фронтенда (опционально):
```bash
cd frontend
npm run build
```

3. Запуск серверов:
```bash
# Сервер приложения
cd server
node server.js

# Сервер авторизации (в другом терминале)
cd authServer
node index.js

# Фронтенд (если не собирали, в другом терминале)
cd frontend
npm run dev
```

## Конфигурация
Настройки в файле .env:
```
API_KEY=ваш_api_ключ
DB_URL=mongodb://localhost:27017/cryptonotebook
JWT_SECRET=секретный_ключ
PORT=3000
```

## Демонстрация работы

### Авторизация
![Авторизация](screenshots/1%20Авторизация.png)

### Профиль
![Профиль](screenshots/2%20Профиль.png)

### Добавление валюты
![Добавление валюты](screenshots/3%20Добавление%20валюты.png)

### Просмотр статуса валюты
![Просмотр статуса валюты](screenshots/4%20Просмотр%20статуса%20валюты.png)
