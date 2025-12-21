import { logout } from "../auth.js";
import { requireLogin } from "../auth.js";

await requireLogin();

const logout_btn = document.getElementById("logout_btn");
logout_btn.addEventListener("click", () => {
    logout()
});
