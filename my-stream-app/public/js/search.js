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

    console.log("Searching for:", query);
    console.log("Token:", token);

    if (!query) return;

    try {

        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Response status:", res.status);
        console.log("Response headers:", [...res.headers]);

        const text = await res.text();   // 🔥 get raw response first
        console.log("Raw response:", text);

        if (!res.ok) {
            alert("Search failed: " + text);
            return;
        }

        const data = JSON.parse(text);
        displayResults(data.results);

    } catch (err) {
        console.error("FULL ERROR:", err);
        alert("Something went wrong");
    }
}

function displayResults(results) {

    const container = document.getElementById("results");
    container.innerHTML = "";

    if (!results || results.length === 0) {
        container.innerHTML = "<p>No results found</p>";
        return;
    }

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
                `details.html?id=${item.id}&type=${item.media_type}`;
        });

        container.appendChild(card);
    });
}


