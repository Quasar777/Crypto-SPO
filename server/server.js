require('dotenv').config({ path: '.env' });
const API_KEY = process.env.COINSTATS_API_KEY;

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 8054;
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.static('../frontend/dist'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const start = async() => {
    try {
        mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("успешно подключена бд с основного приложения")
    } catch(e){
        console.log("Ошибка подключения бд с основного приложения: ", e)
        process.exit(1);
    }
}
start()

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        "X-API-KEY": API_KEY,
    },
};

// WebSocket-сервер для передачи обновлений
wss.on("connection", (ws) => {
    console.log("[WebSocket server] Новое соединение WebSocket");

    const sendCoinData = async () => {
        try {
            const response = await fetch("https://openapiv1.coinstats.app/coins", options);

            if (!response.ok) {
                throw new Error("[WebSocket server] Ошибка при получении данных с COINSTATS API");
            }

            const data = await response.json();
            console.log("[WebSocket server] Данные были отправлены клиенту");
            ws.send(JSON.stringify(data)); // Отправляем данные клиенту
        } catch (err) {
            console.error("[WebSocket server] Ошибка при запросе:", err);
        }
    };

    // Отправляем данные сразу после подключения
    sendCoinData();

    // Устанавливаем интервал обновления данных (например, каждые 10 секунд)
    const interval = setInterval(sendCoinData, 99999000);

    ws.on("close", () => {
        console.log("[WebSocket server] Соединение WebSocket закрыто");
        clearInterval(interval); // Очищаем интервал при закрытии соединения
    });
});


// Путь к JSON-файлу
const filePath = path.join(__dirname, 'userData.json');

// Роут для возврата данных из JSON-файла
app.get('/api/user', (req, res) => {
    // Читаем файл
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            // Если файл не найден или произошла ошибка при чтении
            res.status(500).json({ error: '[API] Ошибка при чтении файла' });
        } else {
            try {
                // Парсим JSON и отправляем его
                const cryptoAssets = JSON.parse(data);
                res.json({ cryptoAssets });
            } catch (parseError) {
                // Если JSON некорректен
                res.status(500).json({ error: '[API] Ошибка при парсинге JSON' });
            }
        }
    });
});

server.listen(PORT, () => console.log(`[SERVER NOTE] Сервер запущен на http://localhost:${PORT}`));
