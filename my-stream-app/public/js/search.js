async function search() {
    const query = document.getElementById("query").value;

    const res = await fetch(`/api/search?q=${query}`);


    const data = await res.json();
    displayResults(data.results);
}

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

        card.onclick = () => {
            window.location.href = `player.html?id=${item.id}&type=${item.media_type}`;
        };

        container.appendChild(card);
    });
}

