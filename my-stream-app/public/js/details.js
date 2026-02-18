const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

async function loadDetails() {
    const res = await fetch(`/api/details?id=${id}&type=${type}`);
    const data = await res.json();

    const container = document.getElementById("details-container");

    container.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}">
        <h2>${data.title || data.name}</h2>
        <p>${data.overview}</p>
        <p><strong>Rating:</strong> ${data.vote_average}</p>
        <p><strong>Release:</strong> ${data.release_date || data.first_air_date}</p>
        <div id="extra"></div>
    `;

    if (type === "tv") {
        loadSeasons(data.number_of_seasons);
    } else {
        addWatchButton();
    }
}

function addWatchButton() {
    const extra = document.getElementById("extra");

    extra.innerHTML = `
        <button onclick="watchMovie()">Watch Now</button>
    `;
}

function watchMovie() {
    window.location.href = `player.html?id=${id}&type=movie`;
}

function loadSeasons(totalSeasons) {
    const extra = document.getElementById("extra");

    let seasonOptions = "";
    for (let i = 1; i <= totalSeasons; i++) {
        seasonOptions += `<option value="${i}">Season ${i}</option>`;
    }

    extra.innerHTML = `
        <label>Select Season:</label>
        <select id="seasonSelect">${seasonOptions}</select>

        <label>Select Episode:</label>
        <input type="number" id="episodeSelect" min="1" value="1">

        <button onclick="watchTV()">Watch</button>
    `;
}

function watchTV() {
    const season = document.getElementById("seasonSelect").value;
    const episode = document.getElementById("episodeSelect").value;

    window.location.href = `player.html?id=${id}&type=tv&season=${season}&episode=${episode}`;
}

loadDetails();
