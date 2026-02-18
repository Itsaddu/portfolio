# 🌐 Adwaith JS -- Portfolio & Full-Stack Projects

**Live Demo:** https://adwaithjs.xyz\
**Streaming App:** https://stream.adwaithjs.xyz

------------------------------------------------------------------------

## 📝 Overview

This repository contains my complete personal portfolio website along
with multiple sub-projects, including browser games, a Malayalam
calendar viewer, and a full-stack streaming web application (MyStream).

The portfolio showcases my skills as a:

-   Full Stack Developer\
-   Backend Developer\
-   JavaScript Engineer\
-   Data Science Enthusiast

------------------------------------------------------------------------

## 🚀 Live Projects

### 🌐 Portfolio Website

https://adwaithjs.xyz

Built using pure HTML, CSS, and JavaScript and deployed via GitHub Pages
with custom domain integration.

------------------------------------------------------------------------

### 🎬 MyStream -- Full-Stack Streaming App

https://stream.adwaithjs.xyz

A secure full-stack streaming platform built using:

-   Node.js + Express (backend)\
-   TMDB API (via secure proxy)\
-   VidKing embed player\
-   Custom DNS + SSL via Render

**Features:**\
- Secure TMDB API key handling\
- Movie & TV show browsing\
- Dynamic season & episode selection\
- Episode thumbnails\
- Cast display\
- Watchlist (localStorage)\
- Continue Watching system\
- Custom subdomain deployment

------------------------------------------------------------------------

### 🎮 Browser Games Collection

Includes: - 🐍 Snake Game\
- 🧠 Memory Game\
- 🔫 Shooter Game

Built using pure JavaScript and CSS animations.

------------------------------------------------------------------------

### 📅 Malayalam Calendar 2026 Viewer

Displays monthly PNG calendar images with a clean layout.

------------------------------------------------------------------------

## 🏗️ Complete Project Structure

    portfolio/
    │
    ├── Calender_png_2026/
    │   └── Malayalam calendar PNG files
    │
    ├── games/
    │   ├── games.html
    │   ├── memory.html
    │   ├── shooter.html
    │   ├── snake.html
    │   ├── memory.js
    │   ├── shooter.js
    │   ├── snake.js
    │   ├── game-common.css
    │   └── styles.css
    │
    ├── my-stream-app/
    │   ├── package.json
    │   ├── server.js
    │   └── public/
    │       ├── home.html
    │       ├── login.html
    │       ├── details.html
    │       ├── player.html
    │       ├── search.html
    │       ├── css/
    │       │   └── style.css
    │       └── js/
    │           ├── auth.js
    │           ├── home.js
    │           ├── details.js
    │           ├── player.js
    │           └── search.js
    │
    ├── index.html
    ├── about.html
    ├── skills.html
    ├── projects.html
    ├── repositories.html
    ├── calendar.html
    ├── styles.css
    ├── CNAME
    └── README.md

------------------------------------------------------------------------

## 🛠 Technologies Used

**Frontend** - HTML5\
- CSS3 (Flexbox, Grid)\
- Vanilla JavaScript (ES6)

**Backend (MyStream)** - Node.js\
- Express.js\
- node-fetch\
- dotenv\
- CORS

**APIs** - TMDB API\
- VidKing Embed

**Hosting** - GitHub Pages (Portfolio)\
- Render (Backend)\
- Custom DNS (Domain & SSL)

------------------------------------------------------------------------

## 🔐 Security Implementation (Streaming App)

-   TMDB API key stored securely in environment variables\
-   Backend proxy prevents API exposure\
-   Custom CAA configuration allowing Let's Encrypt\
-   SSL enabled on subdomain\
-   Protected routes using client-side auth logic

------------------------------------------------------------------------

## ⚙️ Local Development

### Portfolio (Static)

Open `index.html` directly in your browser\
or run a local server:

``` bash
python -m http.server 8000
```

### MyStream Backend

Inside `my-stream-app`:

``` bash
npm install
npm start
```

**Environment Variables:**

``` env
TMDB_API_KEY=your_tmdb_api_key
PORT=3000
```

------------------------------------------------------------------------

## 📱 Responsive Breakpoints

-   Mobile: \< 768px\
-   Tablet: 768px -- 1024px\
-   Desktop: \> 1024px

------------------------------------------------------------------------

## 🧠 Learning Outcomes

This project demonstrates:

-   Full-stack architecture design\
-   Secure API proxy implementation\
-   DNS configuration (CNAME + CAA)\
-   SSL certificate debugging\
-   Cloud deployment workflow\
-   Client-side state management\
-   Streaming metadata rendering

------------------------------------------------------------------------

## 👨‍💻 About Me

**Adwaith JS**\
B.Tech -- Computer Science & Engineering\
Amrita Vishwa Vidyapeetham, Amritapuri

📧 Email: adwaithjs2003@outlook.com\
💼 LinkedIn: https://linkedin.com/in/adwaith-j-s-90231b224\
🐙 GitHub: https://github.com/Itsaddu\
🌐 Website: https://adwaithjs.xyz
