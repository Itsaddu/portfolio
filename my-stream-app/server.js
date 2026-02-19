const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();


const app = express();

/* ================= SECURITY MIDDLEWARE ================= */

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: [
          "'self'",
          "https://image.tmdb.org",
          "data:"
        ],
        connectSrc: [
          "'self'"
        ]
      }
    }
  })
);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ================= ENV VARIABLES ================= */

const API_KEY = process.env.TMDB_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;

if (!API_KEY) {
    console.error("TMDB_API_KEY is missing in environment variables.");
    process.exit(1);
}

if (!JWT_SECRET) {
    console.error("JWT_SECRET is missing in environment variables.");
    process.exit(1);
}

if (!ADMIN_USER || !ADMIN_PASS) {
    console.error("ADMIN_USER or ADMIN_PASS missing in environment variables.");
    process.exit(1);
}

/* ================= ROOT ROUTE ================= */

app.get("/", (req, res) => {
    res.redirect("/login.html");
});

/* ================= HASH PASSWORD (FROM ENV) ================= */

const hashedPassword = bcrypt.hashSync(ADMIN_PASS, 10);

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

        if (username !== ADMIN_USER) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const valid = await bcrypt.compare(password, hashedPassword);

        if (!valid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { username },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});


/* ================= FOR THE BUTTONS I GAUSS ================= */





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


