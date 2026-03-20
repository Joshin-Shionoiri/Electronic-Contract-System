// ログイン情報
const loginUser = JSON.parse(localStorage.getItem("loginUser") || "null");

// login.html 以外で未ログインならリダイレクト
if (!loginUser && !location.pathname.endsWith("login.html")) {
    location.href = "login.html";
}

window.addEventListener("DOMContentLoaded", () => {
    const nameDisplay = document.getElementById("userNameDisplay");
    if (nameDisplay && loginUser) {
        nameDisplay.textContent = loginUser.name;
    }
});

function toggleUserMenu() {
    const menu = document.getElementById("userDropdown");
    if (menu) {
        menu.style.display = (menu.style.display === "block") ? "none" : "block";
    }
}

function logout() {
    localStorage.removeItem("loginUser");
    location.href = "login.html";
}

// 社員証バーコードログイン用（ライブラリは別途読み込み前提）
function loginWithBarcodeEmployee(code) {
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    const user = employees.find(e => e.employeeCode === code);
    if (!user) {
        alert("社員証が認識できませんでした。");
        return;
    }
    localStorage.setItem("loginUser", JSON.stringify({
        type: "employee",
        code: user.employeeCode,
        name: user.employeeName
    }));
    location.href = "index.html";
}
