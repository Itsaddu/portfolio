console.log("SEARCH.JS LOADED");

document.addEventListener("DOMContentLoaded", () => {

    const searchBtn = document.getElementById("searchBtn");
    const homeBtn = document.getElementById("homeBtn");
    const queryInput = document.getElementById("query");

    // Home button
    homeBtn?.addEventListener("click", () => {
        window.location.href = "home.html";
    });

    // Search button click
    searchBtn?.addEventListener("click", performSearch);

    // Press Enter inside input
    queryInput?.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            performSearch();
        }
    });

});


async function performSearch() {

    const query = document.getElementById("query").value.trim();
    const token = localStorage.getItem("authToken");

    if (!query) return;

    if (!token) {
        alert("Session expired. Please login again.");
        window.location.href = "login.html";
        return;
    }

    try {

        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // If token expired
        if (res.status === 401 || res.status === 403) {
            alert("Session expired. Please login again.");
            localStorage.removeItem("authToken");
            window.location.href = "login.html";
            return;
        }

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Server error:", errorText);
            alert("Search failed. Please try again.");
            return;
        }

        const data = await res.json();

        console.log("DATA RECEIVED:", data);
        console.log("IS ARRAY:", Array.isArray(data?.results));

        displayResults(data?.results || []);

    } catch (err) {
        console.error("FULL ERROR:", err);
        alert("Network error. Please try again.");
    }
}



function displayResults(results) {

    const container = document.getElementById("results");
    container.innerHTML = "";

    if (!Array.isArray(results)) {
        console.error("Results is not array:", results);
        container.innerHTML = "<p>Error loading results</p>";
        return;
    }

    if (results.length === 0) {
        container.innerHTML = "<p>No results found</p>";
        return;
    }

    results.forEach(item => {

        if (!item) return;
        if (item.media_type !== "movie" && item.media_type !== "tv") return;
        if (!item.poster_path) return;

        const title = item.title || item.name || "Untitled";

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${title}">
            <p>${title}</p>
        `;

        card.addEventListener("click", () => {
            window.location.href =
                `details.html?id=${item.id}&type=${item.media_type}`;
        });

        container.appendChild(card);
    });

}
