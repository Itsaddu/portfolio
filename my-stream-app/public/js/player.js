const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const type = params.get("type");
const season = params.get("season") || 1;
const episode = params.get("episode") || 1;

const iframe = document.getElementById("player");
const buttons = document.querySelectorAll(".source-btn");

let currentSource = localStorage.getItem("selectedSource") || "vidking";

document.addEventListener("DOMContentLoaded", () => {
    activateSource(currentSource);

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const source = btn.dataset.source;
            activateSource(source);
        });
    });
});

async function activateSource(source) {
    currentSource = source;
    localStorage.setItem("selectedSource", source);

    buttons.forEach(btn =>
        btn.classList.remove("active-source")
    );

    document.querySelector(`[data-source="${source}"]`)
        .classList.add("active-source");

    let embedURL = "";

    if (source === "vidking") {
        if (type === "movie") {
            embedURL = `https://www.vidking.net/embed/movie/${id}`;
        } else {
            embedURL = `https://www.vidking.net/embed/tv/${id}/${season}/${episode}`;
        }
    }

    if (source === "vidstream") {
        if (type === "movie") {
            embedURL = `https://vidstreaming.io/embed/tmdb/movie/${id}`;
        } else {
            embedURL = `https://vidstreaming.io/embed/tmdb/tv/${id}/${season}/${episode}`;
        }
    }

    if (source === "upcloud") {
        const imdb = await fetchIMDb();
        if (!imdb) {
            alert("IMDb ID not found.");
            return;
        }

        embedURL = `https://upcloudstream.com/embed/${imdb}`;
    }

    if (source === "trailer") {
        const trailerKey = await fetchTrailer();
        if (!trailerKey) {
            alert("Trailer not available.");
            return;
        }
        embedURL = `https://www.youtube.com/embed/${trailerKey}`;
    }

    iframe.src = embedURL;
}

/* -------- FETCH IMDB ID FOR UPCLOUD -------- */

async function fetchIMDb() {
    const token = localStorage.getItem("authToken");

    const res = await fetch(`/api/external?id=${id}&type=${type}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    return data.imdb_id;
}

/* -------- FETCH TRAILER KEY -------- */

async function fetchTrailer() {
    const token = localStorage.getItem("authToken");

    const res = await fetch(`/api/videos?id=${id}&type=${type}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    const trailer = data.results.find(
        v => v.type === "Trailer" && v.site === "YouTube"
    );

    return trailer?.key;
}
