document.addEventListener("DOMContentLoaded", () => {

    const searchBtn = document.getElementById("searchBtn");
    const homeBtn = document.getElementById("homeBtn");
    const queryInput = document.getElementById("query");

    homeBtn.addEventListener("click", () => {
        window.location.href = "home.html";
    });

    searchBtn.addEventListener("click", async () => {
        const query = queryInput.value.trim();
        if (!query) return;

        const token = localStorage.getItem("authToken");

        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!res.ok) {
            alert("Search failed. Maybe session expired?");
            return;
        }

        const data = await res.json();
        displayResults(data.results);
    });

});

function displayResults(results) {
    const container = document.getElementById("results");
    container.innerHTML = "";

    results.forEach(item => {
        if (!item.poster_path) return;

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${item.poster_path}">
            <p>${item.title || item.name}</p>
        `;

        card.addEventListener("click", () => {
            window.location.href =
                `details.html?id=${item.id}&type=${item.media_type || "movie"}`;
        });

        container.appendChild(card);
    });
}
