import { get_subject, logout } from "../auth.js";
import { requireLogin, get_universities, get_universities } from "../auth.js";
import { showLoading, hideLoading } from "../auth.js";

showLoading();
await requireLogin();
const list = await get_universities();
hideLoading();

const university_input = document.getElementById("university_input");
const university_list = document.getElementById("university_list");
const subject_input = document.getElementById("subject_input");
const subject_list = document.getElementById("subject_list");

list.data.map(x => x[0]);

function setDatalist_university_list(values) {
    university_list.replaceChildren(
        ...values.map(v => {
            const opt = document.createElement("option");
            opt.value = v;          // 注意：datalist 要用 value
            return opt;
        })
    );
}

function setDatalist_subject_list(values) {
    subject_list.replaceChildren(
        ...values.map(v => {
            const opt = document.createElement("option");
            opt.value = v;          // 注意：datalist 要用 value
            return opt;
        })
    );
}

function isValid(val){
    return Array.from(university_list.options).some(o => o.value === val);
}

university_input.addEventListener("blur", () => {
    if (university_input.value && !isValid(university_input.value.trim())) {
        subject_input.type = "hidden";
        alert("請從清單選擇");
        university_input.value = "";
    }else{
        subject_input.type = "text";
        showLoading();
        const data = get_subject(university_input.value);
        hideLoading();
        if(data.ok){
            data.data.map(x => x.name);
            setDatalist_subject_list(data.data);
        }else{
            alert(data.error);
        }
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

setDatalist_university_list(list.data);