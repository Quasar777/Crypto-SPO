require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Подключение к PostgreSQL
});

// Проверка подключения к базе данных при старте приложения
(async () => {
    try {
        const client = await pool.connect();
        console.log("Успешное подключение к PostgreSQL");
        client.release();
    } catch (error) {
        console.error("[!] Ошибка подключения к PostgreSQL:", error.message);
        process.exit(1); // Завершаем процесс с ошибкой
    }
})();

// Регистрация пользователя
app.post("/register", [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const balance = 0; // Начальный баланс

    try {
        const result = await pool.query(
            "INSERT INTO users (email, password_hash, role, balance) VALUES ($1, $2, $3, $4) RETURNING id, email, role",
            [email, hashedPassword, role || "user", balance]
        );
        res.json({ message: "User registered", user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
});

// Вход в систему
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token });
});

// Middleware для проверки токена
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Доступ к профилю
app.get("/profile", authMiddleware, async (req, res) => {
    const result = await pool.query("SELECT id, email, role, balance FROM users WHERE id = $1", [req.user.id]);
    res.json(result.rows[0]);
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
