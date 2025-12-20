const API_BASE = "https://gp-backend-mis1.onrender.com";

const res = await fetch("`${window.API_BASE}/api/me`");
const data = await res.json();
if(!res.logged_in) window.location.href = "/";

async function logout() {
    const r = await fetch(`${API_BASE}/api/logout`, {
        method: "POST",
        credentials: "include" // ✅ 讓瀏覽器把 session cookie 一起帶去後端
    });

    if (!r.ok) {
        alert("Logout failed");
        return;
    }

    // ✅ 登出成功後，前端自己跳回首頁
    window.location.href = "/"; // 這是 GitHub Pages 的 /
}