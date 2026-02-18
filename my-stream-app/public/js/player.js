const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");
const season = params.get("season");
const episode = params.get("episode");

let embedURL = "";

if (type === "movie") {
    embedURL = `https://www.vidking.net/embed/movie/${id}`;
} else {
    embedURL = `https://www.vidking.net/embed/tv/${id}/${season || 1}/${episode || 1}`;
}

document.getElementById("player").src = embedURL;
