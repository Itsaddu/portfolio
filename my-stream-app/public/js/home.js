async function loadHome() {
    const movieRes = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${ff056ce67b4152390a7045ff97e04289}`);
    const tvRes = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${ff056ce67b4152390a7045ff97e04289}`);

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
