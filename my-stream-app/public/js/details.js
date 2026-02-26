const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

document.addEventListener("DOMContentLoaded", () => {
    loadDetails();
});

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

                <button id="watchBtn">▶ Watch Now</button>
                <button id="trailerBtn">🎬 Watch Trailer</button>

                <div id="trailerContainer"></div>
            </div>
        </div>
    `;

    document.getElementById("watchBtn")
        .addEventListener("click", () => {
            window.location.href = `player.html?id=${id}&type=${type}`;
        });

    document.getElementById("trailerBtn")
        .addEventListener("click", loadTrailer);
}

/* ----------- OFFICIAL YOUTUBE TRAILER ----------- */

async function loadTrailer() {
    const token = localStorage.getItem("authToken");

    const res = await fetch(`/api/videos?id=${id}&type=${type}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    const trailer = data.results.find(
        v => v.type === "Trailer" && v.site === "YouTube"
    );

    if (!trailer) {
        alert("No trailer available.");
        return;
    }

    document.getElementById("trailerContainer").innerHTML = `
        <iframe width="100%" height="400"
            src="https://www.youtube.com/embed/${trailer.key}"
            frameborder="0" allowfullscreen>
        </iframe>
    `;
}
