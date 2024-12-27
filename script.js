document.addEventListener("DOMContentLoaded", async () => {
    // Initializing dynamic sections
    await chargerMeilleurFilm();
    await chargerFilmsComedie();
    await chargerFilmsMieuxNotes();
    await chargerGenres();
    await chargerFilmsSciencesFiction();
    initialiserGestionModale();
});

async function chargerMeilleurFilm() {
    const meilleurFilmSection = document.querySelector(".meilleur-film .film");

    try {
        // Get the best rated movie
        const response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=1");
        const data = await response.json();
        const meilleurFilm = data.results[0];

        // Retrieve details with URL
        const detailsResponse = await fetch(meilleurFilm.url);
        const detailsData = await detailsResponse.json();

        // Display title and description
        meilleurFilmSection.innerHTML = `
            <img src="${meilleurFilm.image_url}" alt="Affiche du film ${meilleurFilm.title}">
            <div class="film-presentation">
                <h3>${detailsData.title}</h3>
                <p>${detailsData.description}</p>
                <button class="details-btn" data-film-url="${detailsData.url}">Voir Détails</button>
            </div>
        `;

        // Add the handler to open the modal
        ajouterGestionnairesDetails(meilleurFilmSection);
    } catch (error) {
        console.error("Erreur lors de la récupération du meilleur film :", error);
        meilleurFilmSection.innerHTML = `<p>Impossible de charger le meilleur film. Veuillez réessayer plus tard.</p>`;
    }
}

// Load films for the "best rated film" category
async function chargerFilmsMieuxNotes() {
    const topRatedGrid = document.querySelector("#top-rated-films .films-grid");

    try {
        const response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=6");
        const data = await response.json();

        topRatedGrid.innerHTML = data.results
            .map((film) => `
                <div class="film-card">
                    <img src="${film.image_url}" alt="Affiche de ${film.title}">
                    <div class="film-overlay">
                        <h3 class="film-title">${film.title}</h3>
                        <button class="details-btn" data-film-url="${film.url}">Détails</button>
                    </div>
                </div>
            `)
            .join("");

        ajouterGestionnairesDetails(topRatedGrid);
        ajouterGestionVoirPlus(document.querySelector("#top-rated-films"));
    } catch (error) {
        console.error("Erreur lors de la récupération des films les mieux notés :", error);
    }
}

// Load movies for the "Comedy" category
async function chargerFilmsComedie() {
    const comedyGrid = document.querySelector("#comedy-category .films-grid");

    try {
        const response = await fetch("http://localhost:8000/api/v1/titles/?genre_contains=Comedy&sort_by=-imdb_score&page_size=6");
        const data = await response.json();

        comedyGrid.innerHTML = data.results
            .map((film) => `
                <div class="film-card">
                    <img src="${film.image_url}" alt="Affiche de ${film.title}">
                    <div class="film-overlay">
                        <h3 class="film-title">${film.title}</h3>
                        <button class="details-btn" data-film-url="${film.url}">Détails</button>
                    </div>
                </div>
            `)
            .join("");

        ajouterGestionnairesDetails(comedyGrid);
        ajouterGestionVoirPlus(document.querySelector("#comedy-category"));
    } catch (error) {
        console.error("Erreur lors de la récupération des films de comédie :", error);
    }
}

// Load movies for the "Sci-Fi" category
async function chargerFilmsSciencesFiction() {
    const sciFiGrid = document.querySelector("#sci-fi-category .films-grid");

    try {
        const response = await fetch("http://localhost:8000/api/v1/titles/?genre_contains=Sci-Fi&sort_by=-imdb_score&page_size=6");
        const data = await response.json();

        sciFiGrid.innerHTML = data.results
            .map((film) => `
                <div class="film-card">
                    <img src="${film.image_url}" alt="Affiche de ${film.title}">
                    <div class="film-overlay">
                        <h3 class="film-title">${film.title}</h3>
                        <button class="details-btn" data-film-url="${film.url}">Détails</button>
                    </div>
                </div>
            `)
            .join("");

        ajouterGestionnairesDetails(sciFiGrid);
        ajouterGestionVoirPlus(document.querySelector("#sci-fi-category"));
    } catch (error) {
        console.error("Erreur lors de la récupération des films de comédie :", error);
    }
}

// Load genres for dropdown menu
async function chargerGenres() {
    const categorySelect = document.getElementById("category-select");
    const filmsGrid = document.querySelector(".categorie-libre .films-grid");

    try {
        const response = await fetch("http://localhost:8000/api/v1/genres/?page_size=50");
        const data = await response.json();

        categorySelect.innerHTML = data.results
            .map((genre) => `<option value="${genre.name}">${genre.name}</option>`)
            .join("");

        categorySelect.addEventListener("change", async () => {
            const selectedGenre = categorySelect.value;
            await afficherFilmsPourGenre(selectedGenre, filmsGrid);
        });

        // Load movies for first genre by default
        if (data.results.length > 0) {
            await afficherFilmsPourGenre(data.results[0].name, filmsGrid);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des genres :", error);
    }
}

// Show movies for a given genre
async function afficherFilmsPourGenre(genre, filmsGrid) {
    try {
        const response = await fetch(
            `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=6&genre_contains=${encodeURIComponent(genre)}`
        );
        const data = await response.json();

        filmsGrid.innerHTML = data.results
            .map((film) => `
                <div class="film-card">
                    <img src="${film.image_url}" alt="Affiche de ${film.title}">
                    <div class="film-overlay">
                        <h3 class="film-title">${film.title}</h3>
                        <button class="details-btn" data-film-url="${film.url}">Détails</button>
                    </div>
                </div>
            `)
            .join("");

        ajouterGestionnairesDetails(filmsGrid);
        ajouterGestionVoirPlus(filmsGrid.parentElement);
    } catch (error) {
        console.error(`Erreur lors de la récupération des films pour le genre ${genre} :`, error);
    }
}

// Function to format numbers with spaces and a "$" symbol
function formaterMontant(montant) {
    if (!montant) return "Non disponible"; // Si le montant est nul ou non défini
    return montant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " $";
}

// Function to format date
function formaterDate(date) {
    if (!date) return "Non disponible";
    return date.split("-").reverse().join("/");
}

// Show movie details in modal
async function afficherDetailsFilm(filmUrl) {
    try {
        if (!filmUrl) {
            console.error("URL du film manquante. Impossible d'effectuer l'appel API.");
            return;
        }

        const response = await fetch(filmUrl);
        const film = await response.json();

        const modal = document.getElementById("modal");

        // Mise à jour des informations dans la modale
        document.getElementById("modal-title").textContent = film.title || "Titre non disponible";
        document.getElementById("modal-meta").textContent = `${film.genres?.join(", ") || "Genre inconnu"} - ${film.year || "Année inconnue"}`;
        document.getElementById("modal-score").textContent = `${film.imdb_score || "N/A"} / 10`;
        document.getElementById("modal-release").textContent = formaterDate(film.date_published) || "Date inconnue";
        document.getElementById("modal-classification").textContent = film.rated || "Non classifié";
        document.getElementById("modal-director").textContent = film.directors?.join(", ") || "Non disponible";
        document.getElementById("modal-actors").textContent = film.actors?.join(", ") || "Non disponible";
        document.getElementById("modal-duration").textContent = `${film.duration || "N/A"} minutes`;
        document.getElementById("modal-country").textContent = film.countries?.join(", ") || "Non disponible";
        document.getElementById("modal-boxoffice").textContent = formaterMontant(film.worldwide_gross_income) || "Non disponible";
        document.getElementById("modal-summary").textContent = film.description || "Résumé non disponible.";
        document.getElementById("modal-poster").src = film.image_url || "";

        // Afficher la modale
        modal.style.display = "flex";
    } catch (error) {
        console.error("Erreur lors de la récupération des détails du film :", error);
    }
}

// Add handlers for "Details" buttons
function ajouterGestionnairesDetails(container) {
    const detailsButtons = container.querySelectorAll(".details-btn");

    // Add a handler to each button
    detailsButtons.forEach((button) => {
        button.addEventListener("click", async () => {
            const filmUrl = button.getAttribute("data-film-url");
            if (filmUrl) {
                await afficherDetailsFilm(filmUrl);
            }
        });
    });
}

// Initialize handlers for modal window
function initialiserGestionModale() {
    const modal = document.getElementById("modal");
    const closeModalButtons = document.querySelectorAll(".close-button");

    function cacherModal() {
        modal.style.display = "none";
    }

    // Adding handlers to close buttons
    closeModalButtons.forEach((btn) => {
        btn.addEventListener("click", cacherModal);
    });

    // Close the modal by clicking outside its content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            cacherModal();
        }
    });
}

function ajouterGestionVoirPlus(container) {
    const voirPlusButton = container.querySelector(".voir-plus-btn");
    const films = container.querySelectorAll(".film-card");

    let filmsAffiches = calculerFilmsVisibles();

    // Afficher ou masquer les films selon la taille de l'écran
    window.addEventListener("resize", () => {
        filmsAffiches = calculerFilmsVisibles();
        ajusterAffichageFilms(films, filmsAffiches, voirPlusButton);
    });

    // Basculer entre "Voir plus" et "Voir moins" au clic
    voirPlusButton.addEventListener("click", () => {
        const tousLesFilmsAffiches = filmsAffiches >= films.length;

        if (tousLesFilmsAffiches) {
            // Revenir à l'affichage par défaut
            filmsAffiches = calculerFilmsVisibles();
            voirPlusButton.textContent = "Voir plus";
        } else {
            // Afficher tous les films
            filmsAffiches = films.length;
            voirPlusButton.textContent = "Voir moins";
        }

        ajusterAffichageFilms(films, filmsAffiches, voirPlusButton);
    });

    // Initialiser l'affichage des films
    ajusterAffichageFilms(films, filmsAffiches, voirPlusButton);
}

function ajusterAffichageFilms(films, filmsAffiches, voirPlusButton) {
    films.forEach((film, index) => {
        film.style.display = index < filmsAffiches ? "block" : "none";
    });

    const tousLesFilmsAffiches = filmsAffiches >= films.length;

    if (tousLesFilmsAffiches) {
        voirPlusButton.textContent = "Voir moins";
    } else {
        voirPlusButton.textContent = "Voir plus";
    }

    voirPlusButton.style.display = films.length > calculerFilmsVisibles() ? "block" : "none";
}


function calculerFilmsVisibles() {
    if (window.innerWidth >= 1024) return 6; // Desktop : 6 films visibles
    if (window.innerWidth >= 768) return 4; // Tablet : 4 films visibles
    return 2; // Mobile : 2 films visibles
}
