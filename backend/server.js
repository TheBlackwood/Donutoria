const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("🍩 Donutoria Backend Running!");
});

// Register API
app.post("/api/register", (req, res) => {
    const { username, phone } = req.body;

    console.log("New Register:");
    console.log(username);
    console.log(phone);

    res.json({
        success: true,
        message: "ثبت نام با موفقیت دریافت شد.",
        user: username
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});