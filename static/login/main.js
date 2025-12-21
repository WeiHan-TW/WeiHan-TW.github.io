import { login } from "../auth.js";
import { showLoading, hideLoading } from "../auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const name = document.getElementById("name");
    const password = document.getElementById("password");
    const login_btn = document.getElementById("login");

    login_btn.addEventListener("click", async() => {
        event.preventDefault(); // ⬅️ 阻止原本的表單直接 POST /login 重新整理頁面
        showLoading();
        try{
            const response = await login(name.value, password.value);
            if (response.ok) {
                // 3. 登入成功 → 導回首頁（或你想去的頁）
                window.location.href = "./dashboard.html";
            } else {
                alert(response.data.message)
            }
            hideLoading();
        } catch (err) {
            console.error(err);
            hideLoading();
            alert("系統錯誤，請稍後再試");
        }
    });
});