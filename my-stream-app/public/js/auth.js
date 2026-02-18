const API_KEY = "ff056ce67b4152390a7045ff97e04289";

function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        localStorage.setItem("authToken", "loggedIn");
        window.location.href = "home.html";
    } else {
        alert("Invalid login");
    }
}

function logout() {
    localStorage.removeItem("authToken");
    window.location.href = "login.html";
}

function checkAuth() {
    if (!localStorage.getItem("authToken")) {
        window.location.href = "login.html";
    }
}

function goHome() {
    window.location.href = "home.html";
}

function goSearch() {
    window.location.href = "search.html";
}

checkAuth();
