

function login() {
    const user = document.getElementById(1234).value;
    const pass = document.getElementById(1234).value;

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


