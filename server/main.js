require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");

if (!process.env.JWT_SECRET) {
    console.error("[ERROR] JWT_SECRET is missing in environment variables");
    process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cookieParser());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

(async () => {
    try {
        const client = await pool.connect();
        console.log("[INFO] Connected to PostgreSQL");
        client.release();
    } catch (error) {
        console.error("[ERROR] Failed to connect to PostgreSQL:", error.message);
        process.exit(1);
    }
})();

const generateRefreshToken = () => crypto.randomBytes(40).toString('hex');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Unauthorized" });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

app.post("/register", [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const refreshToken = generateRefreshToken();

    try {
        const result = await pool.query(
            "INSERT INTO users (email, password_hash, role, balance, refresh_token) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, role",
            [email, hashedPassword, role || "user", 0, refreshToken]
        );
        res.json({ message: "User registered", user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: "Registration failed", details: error.message });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const refreshToken = generateRefreshToken();
        await pool.query("UPDATE users SET refresh_token = $1 WHERE id = $2", [refreshToken, user.id]);

        const accessToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ accessToken, expiresIn: 900 });
    } catch (error) {
        res.status(500).json({ error: "Login failed", details: error.message });
    }
});

app.post("/refresh-token", async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "Refresh token missing" });

    try {
        const result = await pool.query("SELECT * FROM users WHERE refresh_token = $1", [refreshToken]);
        const user = result.rows[0];

        if (!user) return res.status(403).json({ message: "Invalid refresh token" });

        const newAccessToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.json({ accessToken: newAccessToken, expiresIn: 900 });
    } catch (error) {
        res.status(500).json({ error: "Failed to refresh token", details: error.message });
    }
});

app.post("/logout", authMiddleware, async (req, res) => {
    try {
        await pool.query("UPDATE users SET refresh_token = NULL WHERE id = $1", [req.user.id]);
        res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "strict" });
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: "Logout failed", details: error.message });
    }
});

app.get("/profile", authMiddleware, async (req, res) => {
    try {
        const result = await pool.query("SELECT id, email, role, balance FROM users WHERE id = $1", [req.user.id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch profile", details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
