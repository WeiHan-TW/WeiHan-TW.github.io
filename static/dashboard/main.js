import { logout } from "../auth.js";
import { requireLogin } from "../auth.js";

await requireLogin();
console.log("ok");

const logoutBtn = document.getElementById("logout_btn");
if (!logoutBtn) {
    console.error("找不到 #logout_btn（按鈕不存在或 id 不一致）");
} else {
    logoutBtn.addEventListener("click", () => {
        console.log("click");
        logout();
    });
}