const express = require("express");
const cors = require("cors");

const db = require("./database/database");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// =========================
// DATABASE SETUP
// =========================

db.run(`
    ALTER TABLE users ADD COLUMN rank TEXT DEFAULT '-'
`, (err) => {

    if (err && !err.message.includes("duplicate column name")) {

        console.log("❌ Error adding rank column:", err.message);

    }

});


db.run(`
    ALTER TABLE users ADD COLUMN donuts INTEGER DEFAULT 0
`, (err) => {

    if (err && !err.message.includes("duplicate column name")) {

        console.log("❌ Error adding donuts column:", err.message);

    }

});

// =========================
// HOME
// =========================

app.get("/", (req, res) => {

    res.send("🍩 Donutoria Backend Running!");

});


// =========================
// REGISTER
// =========================

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


// =========================
// LOGIN
// =========================

app.post("/api/login", (req, res) => {

    const { username, phone } = req.body;

const sql = `
    SELECT id, username, phone, rank, donuts
    FROM users
    WHERE username = ? AND phone = ?
`;

    db.get(sql, [username, phone], (err, user) => {

        if (err) {

            console.log(err.message);

            return res.json({

                success: false,
                message: "خطا در ورود."

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

            user: user

        });

    });

});


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});