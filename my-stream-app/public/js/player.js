const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

if (!id || !type) {
    window.location.href = "home.html";
}

let embedURL = "";

if (type === "movie") {
    embedURL = `https://www.vidking.net/embed/movie/${id}`;
} else {
    embedURL = `https://www.vidking.net/embed/tv/${id}/1/1`;
}

document.getElementById("player").src = embedURL;
