const API_BASE = "/api";

// If already logged in skip to dashboard
if (localStorage.getItem("username") && (window.location.pathname.endsWith("login.html") || window.location.pathname.endsWith("register.html"))) {
  window.location.href = "dashboard.html";
}

function clearErrors(ids) {
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = "";
  });
}

function showStatus(message, type) {
  const statusEl = document.getElementById("statusMessage");
  statusEl.textContent = message;
  statusEl.className = `status-message ${type}`;
}

// ---------- LOGIN ----------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors(["emailError", "passwordError"]);

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    let hasError = false;
    if (!email.includes("@") || !email.includes(".")) {
      document.getElementById("emailError").textContent = "Enter a valid email address.";
      hasError = true;
    }
    if (password.length < 1) {
      document.getElementById("passwordError").textContent = "Password is required.";
      hasError = true;
    }
    if (hasError) return;

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        showStatus(data.message || "Login failed.", "error");
        return;
      }

      localStorage.setItem("username", data.username);
      showStatus("Login successful! Redirecting...", "success");
      setTimeout(() => (window.location.href = "dashboard.html"), 600);
    } catch (err) {
      showStatus("Could not connect to server. Is it running?", "error");
    }
  });
}

// ---------- REGISTER ----------
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors(["usernameError", "emailError", "passwordError"]);

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    let hasError = false;
    if (username.length < 2) {
      document.getElementById("usernameError").textContent = "Username must be at least 2 characters.";
      hasError = true;
    }
    if (!email.includes("@") || !email.includes(".")) {
      document.getElementById("emailError").textContent = "Enter a valid email address.";
      hasError = true;
    }
    if (password.length < 6) {
      document.getElementById("passwordError").textContent = "Password must be at least 6 characters.";
      hasError = true;
    }
    if (hasError) return;

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        showStatus(data.message || "Registration failed.", "error");
        return;
      }

      showStatus("Account created! Redirecting to login...", "success");
      setTimeout(() => (window.location.href = "login.html"), 800);
    } catch (err) {
      showStatus("Could not connect to server. Is it running?", "error");
    }
  });
}
