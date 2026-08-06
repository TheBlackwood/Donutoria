const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "donutoria.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Error connecting to database:", err.message);
    } else {
        console.log("✅ Database connected successfully.");
    }
});

db.run(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    phone TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

module.exports = db;
// Donutoria Dashboard

document.addEventListener("DOMContentLoaded", () => {


    const username = localStorage.getItem("username");


    if(username){

        const name =
        document.getElementById("playerName");


        if(name){

            name.innerText = username;

        }


        const avatar =
        document.getElementById("playerAvatar");


        if(avatar){

            avatar.src =
            `https://mc-heads.net/avatar/${username}`;

        }

    }



});



function logout(){

    localStorage.removeItem("username");

    window.location.href="login.html";

}