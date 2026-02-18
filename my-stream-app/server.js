const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const API_KEY = process.env.TMDB_API_KEY;

// Popular Movies
app.get("/api/popular-movies", async (req, res) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch popular movies" });
    }
});

// Popular TV
app.get("/api/popular-tv", async (req, res) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch popular TV shows" });
    }
});

// Search
app.get("/api/search", async (req, res) => {
    try {
        const query = req.query.q;

        if (!query) {
            return res.status(400).json({ error: "Missing search query" });
        }

        const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );

        const data = await response.json();
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: "Search failed" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});


// Get movie or TV details
app.get("/api/details", async (req, res) => {
    try {
        const { id, type } = req.query;

        if (!id || !type) {
            return res.status(400).json({ error: "Missing id or type" });
        }

        const response = await fetch(
            `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`
        );

        const data = await response.json();
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch details" });
    }
});


