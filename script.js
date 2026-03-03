const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");
const scoreText = document.getElementById("score");
const crackTime = document.getElementById("crack-time");
const badge = document.getElementById("badge");
const suggestionList = document.getElementById("suggestion-list");
const toggleBtn = document.getElementById("toggleBtn");

const commonPasswords = [
    "123456", "password", "12345678",
    "qwerty", "abc123", "111111",
    "123123", "admin", "welcome"
];

passwordInput.addEventListener("input", analyzePassword);

toggleBtn.addEventListener("click", () => {
    passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
});

function analyzePassword() {
    let password = passwordInput.value;
    let score = 0;
    let suggestions = [];

    if (password.length >= 12) score += 3;
    else if (password.length >= 8) score += 2;
    else suggestions.push("Use at least 8–12 characters.");

    if (/[A-Z]/.test(password)) score += 2;
    else suggestions.push("Include uppercase letters.");

    if (/[a-z]/.test(password)) score += 2;
    else suggestions.push("Include lowercase letters.");

    if (/[0-9]/.test(password)) score += 2;
    else suggestions.push("Add numbers.");

    if (/[^A-Za-z0-9]/.test(password)) score += 2;
    else suggestions.push("Add special characters (!@#$).");

    // Weak patterns
    if (commonPasswords.includes(password.toLowerCase())) {
        score = 1;
        suggestions.push("This is a very common password.");
    }

    if (/(.)\1\1/.test(password)) {
        score -= 2;
        suggestions.push("Avoid repeated characters.");
    }

    if (/123|abc|qwerty/i.test(password)) {
        score -= 2;
        suggestions.push("Avoid sequential patterns.");
    }

    score = Math.max(0, Math.min(score, 10));

    updateUI(score, suggestions);
}

function updateUI(score, suggestions) {

    scoreText.innerText = "Score: " + score + " / 10";

    suggestionList.innerHTML = "";
    suggestions.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        suggestionList.appendChild(li);
    });

    if (score <= 3) {
        setStrength(30, "#e74c3c",
            "Very Weak", "Seconds", "Beginner 🔰");
    }
    else if (score <= 6) {
        setStrength(60, "#f39c12",
            "Moderate", "Hours", "Secure User 🛡");
    }
    else if (score <= 8) {
        setStrength(80, "#27ae60",
            "Strong", "Years", "Cyber Pro 💻");
    }
    else {
        setStrength(100, "#2980b9",
            "Very Strong", "Extremely Secure", "Security Master 🔐");
    }
}

function setStrength(width, color, level, time, badgeLevel) {
    strengthBar.style.width = width + "%";
    strengthBar.style.background = color;
    strengthText.innerText = "Security Level: " + level;
    crackTime.innerText = "Estimated Crack Time: " + time;
    badge.innerText = "Level: " + badgeLevel;
}