import { logout } from "../auth.js";
import { requireLogin } from "../auth.js";

const res = requireLogin();

document.addEventListener("DOMContentLoaded", () => {
    const logout_btn = document.getElementById("logout");
    logout_btn.addEventListener("click", async() => {logout()});
})

/*
async function logout_btn() {
    const r = await fetch(`${window.API_BASE}/api/logout`, {
        method: "POST",
        credentials: "include" // ✅ 讓瀏覽器把 session cookie 一起帶去後端
    });

    if (!r.ok) {
        alert("Logout failed");
        return;
    }

    // ✅ 登出成功後，前端自己跳回首頁
    window.location.href = "/"; // 這是 GitHub Pages 的 /
}*/