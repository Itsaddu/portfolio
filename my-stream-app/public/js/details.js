const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

document.addEventListener("DOMContentLoaded", loadDetails);

async function loadDetails() {

    const token = localStorage.getItem("authToken");

    const res = await fetch(`/api/details?id=${id}&type=${type}`, {
        headers: { Authorization: `Bearer ${token}` }
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

                ${type === "movie"
                    ? `<button id="watchBtn">▶ Watch Movie</button>`
                    : `<div>
                        <label>Select Season:</label>
                        <select id="seasonSelect"></select>
                       </div>
                       <div id="episodeGrid" class="episode-grid"></div>`
                }
            </div>
        </div>
    `;

    if (type === "movie") {
        document.getElementById("watchBtn")
            .addEventListener("click", () => {
                window.location.href = `player.html?id=${id}&type=movie`;
            });
    }

    if (type === "tv") {
        buildSeasonSelector(data.number_of_seasons);
    }
}

/* ---------------- BUILD SEASONS ---------------- */

function buildSeasonSelector(total) {
    const select = document.getElementById("seasonSelect");

    for (let i = 1; i <= total; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `Season ${i}`;
        select.appendChild(option);
    }

    select.addEventListener("change", (e) => {
        loadEpisodes(e.target.value);
    });

    loadEpisodes(1);
}

/* ---------------- LOAD EPISODES ---------------- */

async function loadEpisodes(seasonNumber) {

    const token = localStorage.getItem("authToken");

    const res = await fetch(`/api/season?id=${id}&season=${seasonNumber}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    const grid = document.getElementById("episodeGrid");
    grid.innerHTML = "";

    data.episodes.forEach(ep => {

        const card = document.createElement("div");
        card.className = "episode-card";

        card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w300${ep.still_path || ''}">
            <h4>Ep ${ep.episode_number}: ${ep.name}</h4>
            <p>${ep.overview || ""}</p>
            <button class="playEp">▶ Play</button>
        `;

        card.querySelector(".playEp")
            .addEventListener("click", () => {
                window.location.href =
                    `player.html?id=${id}&type=tv&season=${seasonNumber}&episode=${ep.episode_number}`;
            });

        grid.appendChild(card);
    });
}
