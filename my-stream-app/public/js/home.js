const token = localStorage.getItem("authToken");

if (!token) {
    window.location.href = "login.html";
}

async function loadHome() {

    try {

        const movieRes = await fetch("/api/popular-movies", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const tvRes = await fetch("/api/popular-tv", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!movieRes.ok || !tvRes.ok) {
            localStorage.removeItem("authToken");
            window.location.href = "login.html";
            return;
        }

        const movies = await movieRes.json();
        const tvshows = await tvRes.json();

        display(movies.results, "movies");
        display(tvshows.results, "tvshows");

    } catch (error) {
        console.error("Failed to load home:", error);
    }
}

function display(items, container) {
    const div = document.getElementById(container);
    div.innerHTML = "";

    items.slice(0, 12).forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${item.poster_path}">
            <p>${item.title || item.name}</p>
        `;

        card.onclick = () => {
            window.location.href =
                `details.html?id=${item.id}&type=${item.media_type || (container === "movies" ? "movie" : "tv")}`;
        };

        div.appendChild(card);
    });
}

loadHome();
