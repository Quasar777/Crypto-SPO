# Крипто блокнот   
Проект позволяющий тренироваться в торговле криптовалютами(демо-трейдинг)

## Установка
В корень проекта копируем файл .env 

В папки frontend, server, authServer устанавливаем npm командой:
```bash
npm install
```
Далее билдим react проект если требуется в папке frontend(нужно будет запускать только сервер):
```bash
npm run build
```
Запускаем сервер server.js в папке server:
```bash
node server.js
```
Запускаем сервер авторизации index.js в папке authServer:
```bash
node index.js
```
Если не билдили фронт, запускаем сервер в папке frontend:
```bash
npm run dev
```
