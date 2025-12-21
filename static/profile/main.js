import { requireLogin } from "../auth.js";
import { login } from "../auth.js";
import { showLoading, hideLoading } from "../auth.js";
import { validateNoEmptyNoSpace } from "../auth.js";

document.addEventListener("DOMContentLoaded", async () => {
    //按鈕
    const change_btn = document.getElementById("change");
    const confirm_btn = document.getElementById("confirm");

    //顯示部分
    const changeArea = document.getElementById("change-area");

    //輸入部分
    const name = document.getElementById("name");
    const password = document.getElementById("password");
    const new_password = document.getElementById("new_password");
    const new_confirm = document.getElementById("new_confirm");

    let is_changing = false;

    //改變changeArea
    function change() {
        if(!is_changing){
            //value
            name.value = data.username;
            new_password.value = "";
            new_confirm.value = "";
            //readOnly
            name.readOnly = true;
            password.readOnly = false;
            //display
            changeArea.style.display = "none";
        }else{
            //readOnly
            password.readOnly = true;
            name.readOnly = false;
            changeArea.style.display = "block";
        }
    }

    //抓取資料
    showLoading();
    const data = await requireLogin();
    name.value = data.username;
    hideLoading();

    change_btn.addEventListener("click",async () => {
        if(is_changing){
            is_changing = false;
            change();
        }
        else if(password.value == "") alert("請先輸入密碼")
        else{
            try{
                const response = await login(name.value, password.value);

                if (response.ok) {
                    is_changing = true;
                    change();
                } else {
                    alert(response.data.message)
                }
            } catch (err) {
                console.error(err);
                alert("系統錯誤，請稍後再試");
            }
        }
    })

    confirm_btn.addEventListener("click",async () => {
        const res = validateNoEmptyNoSpace(name.value);
        if (!res.ok) {
            alert("帳戶名稱"+r.message);
            return;
        }
        res = validateNoEmptyNoSpace(new_password.value);
        if (!res.ok) {
            alert("密碼"+res.message);
            return;
        }
        if(new_password.value != new_confirm){
            alert("密碼不相同")
            return;
        }
        console.log("okok");
    })
});
