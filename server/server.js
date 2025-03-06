require('dotenv').config({ path: '../.env' });
const API_KEY = process.env.COINSTATS_API_KEY;

const express = require('express');
const app = express();
const fs = require("fs");
const cors = require('cors'); // Добавляем CORS
const PORT = 8054;
  
app.use(cors()); // Используем CORS
app.use(express.static('../frontend/dist'));

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        "X-API-KEY": API_KEY
    },
};

// Эндпоинт для получения данных с сервера
app.get("/api/coins", async (req, res) => {
    try {
        // Используем await для асинхронного запроса
        const response = await fetch("https://openapiv1.coinstats.app/coins", options);

        if (!response.ok) {
            throw new Error('Ошибка при получении данных с API');
        }

        const data = await response.json(); // Получаем данные в формате JSON
        console.log("Данные были отправлены");
        res.json(data); // Отправляем данные на клиент

    } catch (err) {
        console.error("Ошибка при запросе:", err);
        res.status(500).json({ error: "Ошибка при чтении данных с сервера" });
    }
});

app.listen(PORT, () => console.log(`[NOTE] Сервер запущен на http://localhost:${PORT}`));
