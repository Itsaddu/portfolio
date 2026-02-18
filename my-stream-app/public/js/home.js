async function loadHome() {
    const movieRes = await fetch("/api/popular-movies");
    const tvRes = await fetch("/api/popular-tv");

    const movies = await movieRes.json();
    const tvshows = await tvRes.json();

    display(movies.results, "movies");
    display(tvshows.results, "tvshows");
}

function display(items, container) {
    const div = document.getElementById(container);
    div.innerHTML = "";

    items.slice(0,12).forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${item.poster_path}">
            <p>${item.title || item.name}</p>
        `;

        card.onclick = () => {
            window.location.href = `player.html?id=${item.id}&type=${item.media_type || (container === "movies" ? "movie" : "tv")}`;
        };

        div.appendChild(card);
    });
}

loadHome();

