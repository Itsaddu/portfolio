const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static("public"));

const API_KEY = process.env.TMDB_API_KEY;

app.get("/api/popular-movies", async (req, res) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    const data = await response.json();
    res.json(data);
});

app.get("/api/search", async (req, res) => {
    const query = req.query.q;
    const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`
    );
    const data = await response.json();
    res.json(data);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

