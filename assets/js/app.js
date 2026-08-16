console.log("Donutoria SMP Website Loaded!");

// =========================
// Copy IP Buttons
// =========================
const copyButtons = [
    document.getElementById("copyIP"),
    document.getElementById("copyIPHero")
];

const toast = document.getElementById("toast");

copyButtons.forEach(button => {
    if (!button) return;

    button.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText("play.donutoria.ir");

            const oldText = button.textContent;
            button.textContent = "Copied!";

            if (toast) {
                toast.classList.add("show");

                setTimeout(() => {
                    toast.classList.remove("show");
                }, 2500);
            }

            setTimeout(() => {
                button.textContent = oldText;
            }, 2000);

        } catch (err) {
            alert("Unable to copy IP.");
        }
    });
});


// =========================
// FAQ
// =========================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const button = item.querySelector(".faq-question");

    if (!button) return;

    button.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});


// =========================
// Server Status
// =========================
async function loadServerStatus() {

    try {

        const response = await fetch("https://api.mcsrvstat.us/3/play.donutoria.ir");
        const data = await response.json();

        if (data.online) {

            const status = document.getElementById("status");
            const players = document.getElementById("players");
            const version = document.getElementById("version");

            if (status) status.textContent = "🟢 Online";
            if (players) players.textContent = `${data.players.online} / ${data.players.max}`;
            if (version) version.textContent = data.version;

        } else {

            const status = document.getElementById("status");
            const players = document.getElementById("players");
            const version = document.getElementById("version");

            if (status) status.textContent = "🔴 Offline";
            if (players) players.textContent = "--";
            if (version) version.textContent = "--";
        }

    } catch {

        const status = document.getElementById("status");

        if (status) status.textContent = "Error";
    }

}

loadServerStatus();


// =========================
// Animated Counters
// =========================
function animateCounter(id, end, duration) {

    const element = document.getElementById(id);

    if (!element) return;

    let start = 0;

    const increment = end / (duration / 16);

    const counter = setInterval(() => {

        start += increment;

        if (start >= end) {

            element.textContent = end;
            clearInterval(counter);

        } else {

            element.textContent = Math.floor(start);

        }

    }, 16);

}

animateCounter("statPlayers", 1200, 2000);
animateCounter("statEvents", 25, 1500);
animateCounter("statRanks", 4, 1000);


// =========================
// Reveal Animation
// =========================
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

    const windowHeight = window.innerHeight;

    reveals.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if (top < windowHeight - 120) {
            item.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


// =========================
// Mobile Menu
// =========================
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".navbar nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

}
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const username = document.getElementById("username").value;
        const phone = document.getElementById("phone").value;

        const message = document.getElementById("registerMessage");

        try {

            const response = await fetch("http://localhost:3000/api/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username,
                    phone: phone
                })

            });

            const data = await response.json();

            if (data.success) {

                message.textContent = "✅ ثبت نام با موفقیت انجام شد!";
                message.style.color = "#22c55e";

            } else {

                message.textContent = "❌ ثبت نام انجام نشد.";
                message.style.color = "#ef4444";

            }

        } catch (error) {

            console.error(error);

            message.textContent = "❌ اتصال به سرور برقرار نشد.";
            message.style.color = "#ef4444";

        }

    });

}
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const username = document.getElementById("loginUsername").value;
        const phone = document.getElementById("loginPhone").value;

        const message = document.getElementById("loginMessage");

        try {

            const response = await fetch("http://localhost:3000/api/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username,
                    phone: phone
                })

            });

            const data = await response.json();

            if (data.success) {

                message.textContent = "✅ ورود با موفقیت انجام شد.";
                message.style.color = "#22c55e";

                console.log("Logged in user:", data.user);

            } else {

                message.textContent = "❌ " + data.message;
                message.style.color = "#ef4444";

            }

        } catch (error) {

            console.error(error);

            message.textContent = "❌ اتصال به سرور برقرار نشد.";
            message.style.color = "#ef4444";

        }

    });

}