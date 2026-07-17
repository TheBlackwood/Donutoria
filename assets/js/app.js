console.log("Donutoria SMP Website Loaded!");
const copyButton = document.getElementById("copyIP");

if (copyButton) {

    copyButton.addEventListener("click", () => {

        navigator.clipboard.writeText("play.donutoria.ir");

        copyButton.textContent = "Copied!";

        setTimeout(() => {

            copyButton.textContent = "Copy IP";

        },2000);

    });

}
const copyButton = document.getElementById("copyIP");
const toast = document.getElementById("toast");

if (copyButton) {

    copyButton.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText("play.donutoria.ir");

            copyButton.textContent = "Copied!";

            if(toast){

                toast.classList.add("show");

                setTimeout(()=>{

                    toast.classList.remove("show");

                },2500);

            }

            setTimeout(()=>{

                copyButton.textContent = "Copy IP";

            },2000);

        } catch(err){

            alert("Unable to copy IP.");

        }

    });

}
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    const button=item.querySelector(".faq-question");

    button.addEventListener("click",()=>{

        item.classList.toggle("active");

    });

});
async function loadServerStatus() {

    try {

        const response = await fetch("https://api.mcsrvstat.us/3/play.donutoria.ir");

        const data = await response.json();

        if (data.online) {

            document.getElementById("status").textContent = "🟢 Online";

            document.getElementById("players").textContent =
                `${data.players.online} / ${data.players.max}`;

            document.getElementById("version").textContent =
                data.version;

        } else {

            document.getElementById("status").textContent = "🔴 Offline";

            document.getElementById("players").textContent = "--";

            document.getElementById("version").textContent = "--";

        }

    }

    catch {

        document.getElementById("status").textContent = "Error";

    }

}

loadServerStatus();
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

    },16);

}

animateCounter("statPlayers",1200,2000);
animateCounter("statEvents",25,1500);
animateCounter("statRanks",4,1000);
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){

    const windowHeight = window.innerHeight;

    reveals.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if(top < windowHeight - 120){

            item.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".navbar nav");

if(menuToggle && nav){

    menuToggle.addEventListener("click",()=>{

        nav.classList.toggle("active");

    });

}