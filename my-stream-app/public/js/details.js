const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

const token = localStorage.getItem("authToken");

if (!token) {
    window.location.href = "login.html";
}


async function loadDetails() {
    const res = await fetch(`/api/details?id=${id}&type=${type}`, {
    headers: {
        Authorization: `Bearer ${token}`
        }
    });

    const data = await res.json();

    const container = document.getElementById("details-container");

    container.innerHTML = `
        <div class="details-header">
            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}">
            <div class="details-info">
                <h2>${data.title || data.name}</h2>
                <p>${data.overview}</p>
                <p><strong>Rating:</strong> ${data.vote_average}</p>
                <p><strong>Release:</strong> ${data.release_date || data.first_air_date}</p>
                <button onclick="addToWatchlist()">Add to Watchlist</button>
                <div id="continueSection"></div>
            </div>
        </div>
        <div id="extra"></div>
        <div id="castSection"></div>
    `;

    checkContinueWatching();

    if (type === "tv") {
        loadSeasons(data.number_of_seasons);
    } else {
        addWatchButton();
    }

    loadCast();
}

/* ---------------- MOVIE WATCH ---------------- */

function addWatchButton() {
    const extra = document.getElementById("extra");
    extra.innerHTML = `
        <button onclick="watchMovie()">Watch Now</button>
    `;
}

function watchMovie() {
    window.location.href = `player.html?id=${id}&type=movie`;
}

/* ---------------- TV SEASONS ---------------- */

async function loadSeasons(totalSeasons) {
    const extra = document.getElementById("extra");

    let seasonOptions = "";
    for (let i = 1; i <= totalSeasons; i++) {
        seasonOptions += `<option value="${i}">Season ${i}</option>`;
    }

    extra.innerHTML = `
        <label>Select Season:</label>
        <select id="seasonSelect"></select>
        <div id="episodeList" class="episode-grid"></div>
    `;

    document.getElementById("seasonSelect").innerHTML = seasonOptions;

    loadEpisodes(1);

    document.getElementById("seasonSelect").addEventListener("change", (e) => {
        loadEpisodes(e.target.value);
    });
}

/* ---------------- EPISODES ---------------- */

async function loadEpisodes(seasonNumber) {
    const res = await fetch(`/api/season?id=${id}&season=${seasonNumber}`, {
    headers: {
        Authorization: `Bearer ${token}`
        }
    });

    const data = await res.json();

    const list = document.getElementById("episodeList");
    list.innerHTML = "";

    data.episodes.forEach(ep => {
        const div = document.createElement("div");
        div.className = "episode-card";

        div.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w300${ep.still_path || ''}">
            <h4>Episode ${ep.episode_number}: ${ep.name}</h4>
            <p>${ep.overview || ""}</p>
        `;

        div.onclick = () => {
            window.location.href =
                `player.html?id=${id}&type=tv&season=${seasonNumber}&episode=${ep.episode_number}`;
        };

        list.appendChild(div);
    });
}

/* ---------------- CAST ---------------- */

async function loadCast() {
    const res = await fetch(`/api/cast?id=${id}&type=${type}`, {
    headers: {
        Authorization: `Bearer ${token}`
        }
    });

    const data = await res.json();

    const castDiv = document.getElementById("castSection");

    castDiv.innerHTML = `<h3>Cast</h3><div class="cast-grid"></div>`;
    const grid = castDiv.querySelector(".cast-grid");

    data.cast.slice(0, 8).forEach(actor => {
        const card = document.createElement("div");
        card.className = "cast-card";

        card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${actor.profile_path || ''}">
            <p>${actor.name}</p>
        `;

        grid.appendChild(card);
    });
}

/* ---------------- WATCHLIST ---------------- */

function addToWatchlist() {
    let list = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (!list.find(item => item.id == id)) {
        list.push({ id, type });
        localStorage.setItem("watchlist", JSON.stringify(list));
        alert("Added to Watchlist");
    }
}

/* ---------------- CONTINUE WATCHING ---------------- */

function checkContinueWatching() {
    const saved = localStorage.getItem("continue_" + id);
    if (!saved) return;

    const data = JSON.parse(saved);

    const section = document.getElementById("continueSection");

    section.innerHTML = `
        <button onclick="continueWatching()">Continue Watching</button>
    `;
}

function continueWatching() {
    const saved = JSON.parse(localStorage.getItem("continue_" + id));

    if (type === "tv") {
        window.location.href =
            `player.html?id=${id}&type=tv&season=${saved.season}&episode=${saved.episode}&progress=${saved.time}`;
    } else {
        window.location.href =
            `player.html?id=${id}&type=movie&progress=${saved.time}`;
    }
}

loadDetails();
