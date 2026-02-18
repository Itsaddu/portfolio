const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const type = params.get("type");
const season = params.get("season") || 1;
const episode = params.get("episode") || 1;
const progress = params.get("progress");

if (!id || !type) {
    window.location.href = "home.html";
}

/* ---------------- BUILD EMBED URL ---------------- */

let embedURL = "";

if (type === "movie") {
    embedURL = `https://www.vidking.net/embed/movie/${id}`;
} else {
    embedURL = `https://www.vidking.net/embed/tv/${id}/${season}/${episode}`;
}

/* Add resume progress if exists */
if (progress) {
    embedURL += `?progress=${progress}`;
}

/* Load player */
document.getElementById("player").src = embedURL;

/* ---------------- CONTINUE WATCHING SAVE ---------------- */

window.addEventListener("message", function (event) {
    if (typeof event.data === "string") {
        try {
            const parsed = JSON.parse(event.data);

            if (parsed.type === "PLAYER_EVENT") {

                const currentTime = parsed.data.currentTime;

                const saveData = {
                    type: type,
                    season: season,
                    episode: episode,
                    time: currentTime
                };

                localStorage.setItem(
                    "continue_" + id,
                    JSON.stringify(saveData)
                );
            }

        } catch (e) {
            // Ignore invalid messages
        }
    }
});
