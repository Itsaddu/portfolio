async function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter username and password");
        return;
    }

    try {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("authToken", data.token);
            window.location.href = "home.html";
        } else {
            alert(data.error || "Invalid login");
        }

    } catch (error) {
        alert("Server error. Please try again.");
        console.error("Login error:", error);
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

// Only protect pages except login
if (!window.location.pathname.includes("login.html")) {
    checkAuth();
}


