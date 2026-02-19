const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

/* ================= SECURITY MIDDLEWARE ================= */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const API_KEY = process.env.TMDB_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

/* ================= BASIC ENV CHECK ================= */

if (!API_KEY) {
    console.error("TMDB_API_KEY is missing in environment variables.");
}

/* ================= ROOT ROUTE ================= */

app.get("/", (req, res) => {
    res.redirect("/login.html");
});

/* ================= DEMO USER ================= */
/* For personal use only */

const demoUser = {
    username: "admin",
    password: bcrypt.hashSync("1234", 10)
};

/* ================= LOGIN RATE LIMIT ================= */

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many login attempts. Try again later."
});

/* ================= LOGIN ================= */

app.post("/api/login", loginLimiter, async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username !== demoUser.username) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const valid = await bcrypt.compare(password, demoUser.password);

        if (!valid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "2h" });

        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});

/* ================= JWT VERIFY MIDDLEWARE ================= */

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ error: "Access denied" });
    }

    const token = authHeader.split(" ")[1];

    try {
        jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
}

/* ================= TMDB ROUTES (PROTECTED) ================= */

app.get("/api/popular-movies", verifyToken, async (req, res) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        res.json(await response.json());
    } catch {
        res.status(500).json({ error: "Failed to fetch popular movies" });
    }
});

app.get("/api/popular-tv", verifyToken, async (req, res) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
        );
        res.json(await response.json());
    } catch {
        res.status(500).json({ error: "Failed to fetch popular TV shows" });
    }
});

app.get("/api/search", verifyToken, async (req, res) => {
    try {
        const query = req.query.q;

        if (!query) {
            return res.status(400).json({ error: "Missing search query" });
        }

        const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );

        res.json(await response.json());

    } catch {
        res.status(500).json({ error: "Search failed" });
    }
});

app.get("/api/details", verifyToken, async (req, res) => {
    try {
        const { id, type } = req.query;

        if (!id || !type) {
            return res.status(400).json({ error: "Missing id or type" });
        }

        const response = await fetch(
            `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`
        );

        res.json(await response.json());

    } catch {
        res.status(500).json({ error: "Failed to fetch details" });
    }
});

app.get("/api/season", verifyToken, async (req, res) => {
    try {
        const { id, season } = req.query;

        if (!id || !season) {
            return res.status(400).json({ error: "Missing id or season" });
        }

        const response = await fetch(
            `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${API_KEY}`
        );

        res.json(await response.json());

    } catch {
        res.status(500).json({ error: "Failed to fetch season" });
    }
});

app.get("/api/cast", verifyToken, async (req, res) => {
    try {
        const { id, type } = req.query;

        if (!id || !type) {
            return res.status(400).json({ error: "Missing id or type" });
        }

        const response = await fetch(
            `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}`
        );

        res.json(await response.json());

    } catch {
        res.status(500).json({ error: "Failed to fetch cast" });
    }
});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
