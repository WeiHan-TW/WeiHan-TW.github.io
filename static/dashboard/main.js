import { logout } from "../auth.js";
import { requireLogin } from "../auth.js";
import { showLoading, hideLoading } from "../auth.js";

/*
showLoading();
await requireLogin();
hideLoading();*/

const university_input = document.getElementById("university_input");
const university_list = document.getElementById("university_list");

function isValid(val){
    return Array.from(university_list.options).some(o => o.value === val);
}

university_input.addEventListener("blur", () => {
    if (university_input.value && !isValid(university_input.value.trim())) {
        alert("請從清單選擇");
        university_input.value = "";
    }
});

const logoutBtn = document.getElementById("logout_btn");
if (!logoutBtn) {
    console.error("找不到 #logout_btn（按鈕不存在或 id 不一致）");
} else {
    logoutBtn.addEventListener("click", () => {
        logout();
    });
}