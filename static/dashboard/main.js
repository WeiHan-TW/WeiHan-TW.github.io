import { logout } from "../auth.js";
import { requireLogin, get_universities, get_subjects } from "../auth.js";
import { showLoading, hideLoading } from "../auth.js";

showLoading();
await requireLogin();
const list = await get_universities();
hideLoading();

const university_input = document.getElementById("university_input");
const university_list = document.getElementById("university_list");
const subject_input = document.getElementById("subject_input");
const subject_list = document.getElementById("subject_list");

function setDatalist_university_list(values) {
    university_list.innerHTML = ""; 
    university_list.replaceChildren(
        ...values.map(v => {
            const opt = document.createElement("option");
            opt.value = v;          // 注意：datalist 要用 value
            return opt;
        })
    );
}

function setDatalist_subject_list(values) {
    subject_list.innerHTML = ""; 
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

university_input.addEventListener("blur", async() => {
    subject_input.value = "";
    if (university_input.value && !isValid(university_input.value.trim())) {
        subject_input.type = "hidden";
        alert("請從清單選擇");
        university_input.value = "";
    }else if(university_input.value){
        showLoading();
        const data = await get_subjects(university_input.value.trim());
        hideLoading();
        if(data.ok){
            subject_input.type = "text";
            const names = data.data.map(x => x.name);
            setDatalist_subject_list(names);
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