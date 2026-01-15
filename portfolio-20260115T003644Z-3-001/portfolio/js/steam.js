/**
 * PORTFOLIO DE ZAKARIA SAÏDOUNI
 * Script commun à toutes les pages
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. GESTION UNIQUE DU MENU ACTIF ---
    // On récupère le nom du fichier actuel proprement
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        // On retire d'abord toute classe active existante pour éviter les doublons
        link.classList.remove("active");
        
        // On compare le href avec le chemin actuel
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });

    // --- 2. EFFET D'APPARITION (FADE-IN) ---
    const cards = document.querySelectorAll('.steam-card, .activity-card, .tool-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "all 0.6s ease-out";
        observer.observe(card);
    });

    // --- 3. CHARGEMENT DE LA MÉTÉO ---
    // On ne l'appelle que si les éléments existent sur la page (Accueil)
    if (document.getElementById('temp')) {
        loadWeatherAchievement();
    }
});

// --- 4. BARRE DE PROGRESSION DE SCROLL ---
window.onscroll = function() {
    const progressLine = document.getElementById("scroll-progress");
    if (progressLine) {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        progressLine.style.width = scrolled + "%";
    }
};

// --- 5. SYSTÈME DE FILTRAGE (Réalisations) ---
function filterProjects(category) {
    const projects = document.querySelectorAll('.project');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase().includes(category) || (category === 'all' && btn.innerText.includes('Tout'))) {
            btn.classList.add('active');
        }
    });

    projects.forEach(project => {
        project.style.display = (category === 'all' || project.classList.contains(category)) ? "block" : "none";
    });
}

// --- 6. FONCTION MÉTÉO ---
async function loadWeatherAchievement() {
    const apiKey = "TA_CLE_API_ICI"; // N'oublie pas ta clé OpenWeatherMap !
    const city = "Paris";
    
    const tempElement = document.getElementById('temp');
    const descElement = document.getElementById('weather-desc');

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`);
        const data = await response.json();

        if (data.cod === 200) {
            tempElement.innerText = Math.round(data.main.temp);
            descElement.innerText = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        }
    } catch (e) {
        console.error("Erreur météo");
    }
}

function filterProjects(category) {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'flex'; // On utilise flex car défini dans ton CSS
        } else {
            project.style.display = 'none';
        }
    });
}