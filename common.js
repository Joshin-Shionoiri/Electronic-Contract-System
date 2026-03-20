// =====================================
// 共通：ログイン情報の読み込み
// =====================================
let loginUser = null;

const saved = sessionStorage.getItem("loginUser");
if (saved) {
    try {
        loginUser = JSON.parse(saved);
    } catch (e) {
        loginUser = null;
    }
}

// =====================================
// 共通：ログアウト
// =====================================
function logout() {
    sessionStorage.removeItem("loginUser");
    location.href = "login.html";
}

// =====================================
// 共通：顧客専用ページチェック
// =====================================
function requireCustomer() {
    if (!loginUser || loginUser.type !== "customer") {
        alert("顧客としてログインしてください。");
        location.href = "login.html";
    }
}

// =====================================
// 共通：社員専用ページチェック
// =====================================
function requireEmployee() {
    if (!loginUser || loginUser.type !== "employee") {
        alert("社員としてログインしてください。");
        location.href = "login.html";
    }
}

// =====================================
// 共通：IndexedDB 初期化（必要なら）
// =====================================

// 顧客DB
function initCustomerDB() {
    const req = indexedDB.open("customersDB", 1);
    req.onupgradeneeded = function(e) {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("customers")) {
            db.createObjectStore("customers", { keyPath: "customerCode" });
        }
    };
}

// 契約DB
function initContractDB() {
    const req = indexedDB.open("contractsDB", 1);
    req.onupgradeneeded = function(e) {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("contracts")) {
            db.createObjectStore("contracts", { keyPath: "contractNumber" });
        }
    };
}

// 初期化実行
initCustomerDB();
initContractDB();

// 社員DB
function initEmployeeDB() {
    const req = indexedDB.open("employeesDB", 1);
    req.onupgradeneeded = function(e) {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("employees")) {
            db.createObjectStore("employees", { keyPath: "employeeCode" });
        }
    };
}

initEmployeeDB();
