Установить зависимости:
npm install express jsonwebtoken bcryptjs dotenv pg express-validator

Запустить сервер:
node main

Создать БД PostgreSQL:
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    balance NUMERIC DEFAULT 0,
    refresh_token TEXT
);

Тестировать с помощью postman:
http://localhost:3000/...
