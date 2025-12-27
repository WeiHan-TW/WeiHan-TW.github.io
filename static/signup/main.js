import { validateNoEmptyNoSpace } from "../auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const name = document.getElementById("name");
    const password = document.getElementById("password");
    const confirm = document.getElementById("confirm");
    const signup_btn = document.getElementById("signup");

    signup_btn.addEventListener("click",async () => {
        try{
            let res = validateNoEmptyNoSpace(name.value);
            if (!res.ok) {
                alert("帳戶名稱"+res.message);
                return;
            }
            res = validateNoEmptyNoSpace(password.value);
            if (!res.ok) {
                alert("密碼"+res.message);
                return;
            }
            else if(password.value != confirm.value){
                alert("密碼不相符");
                confirm.value = "";
                password.value = "";
            }
            else{
                const response = await fetch(`${window.API_BASE}/api/echo`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // 告訴後端：body 是 JSON
                    },
                    body: JSON.stringify({
                        name: name.value,
                        password: password.value,
                    }),
                });

                // (3) 把後端回傳的 JSON 轉成 JS 物件
                const result = await response.json();
                if(result.ok){
                    alert("已成功建立帳號");
                }else{
                    alert(result.error);
                }
            }
        }catch {err}{
            console.error(err);
            alert("系統錯誤，請稍後再試");
            hideLoading();
        }
    });
});