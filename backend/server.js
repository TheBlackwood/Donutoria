const express = require("express");
const cors = require("cors");

const db = require("./database/database");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("🍩 Donutoria Backend Running!");
});

// Register API
app.post("/api/register", (req, res) => {

    const { username, phone } = req.body;

    const sql = `
        INSERT INTO users(username, phone)
        VALUES(?, ?)
    `;

    db.run(sql, [username, phone], function(err) {

        if (err) {

            console.log(err.message);

            return res.json({
                success: false,
                message: "ثبت نام انجام نشد."
            });

        }

        res.json({
            success: true,
            message: "ثبت نام با موفقیت انجام شد.",
            id: this.lastID
        });

    });

});

// Login API
app.post("/api/login", (req, res) => {

    const { username, phone } = req.body;

    const sql = `
        SELECT * FROM users
        WHERE username = ? AND phone = ?
    `;

    db.get(sql, [username, phone], (err, user) => {

        if (err) {

            console.log(err.message);

            return res.json({
                success: false,
                message: "خطا در بررسی اطلاعات."
            });

        }

        if (!user) {

            return res.json({
                success: false,
                message: "نام کاربری یا شماره تلفن اشتباه است."
            });

        }

        res.json({
            success: true,
            message: "ورود با موفقیت انجام شد.",
            user: {
                id: user.id,
                username: user.username,
                phone: user.phone
            }
        });

    });

});
// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});