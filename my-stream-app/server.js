const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const API_KEY = process.env.TMDB_API_KEY;

if (!API_KEY) {
    console.error("TMDB_API_KEY is missing in environment variables.");
}

/* ================= ROOT ROUTE ================= */

app.get("/", (req, res) => {
    res.redirect("/login.html");
});

/* ================= POPULAR MOVIES ================= */

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

/* ================= POPULAR TV ================= */

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

/* ================= SEARCH ================= */

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

/* ================= DETAILS ================= */

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

/* ================= SEASON ================= */

app.get("/api/season", async (req, res) => {
    try {
        const { id, season } = req.query;

        if (!id || !season) {
            return res.status(400).json({ error: "Missing id or season" });
        }

        const response = await fetch(
            `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${API_KEY}`
        );

        const data = await response.json();
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch season" });
    }
});

/* ================= CAST ================= */

app.get("/api/cast", async (req, res) => {
    try {
        const { id, type } = req.query;

        if (!id || !type) {
            return res.status(400).json({ error: "Missing id or type" });
        }

        const response = await fetch(
            `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}`
        );

        const data = await response.json();
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch cast" });
    }
});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
