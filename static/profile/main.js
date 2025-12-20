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
    const res = await fetch(`${API_BASE}/api/me`, {
        method: "GET",
        credentials: "include",
    })
    const data = await res.json();
    if(!res.logged_in) window.location.href = "/";
    name.value = data.username;

    change_btn.addEventListener("click",async () => {
        if(is_changing){
            is_changing = false;
            change();
        }
        else if(password.value == "") alert("請先輸入密碼")
        else{
            try{
                const response = await fetch(`${window.API_BASE}/api/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // 告訴後端：body 是 JSON
                    },
                    body: JSON.stringify({
                        name: name.value,
                        password: password.value,
                    }),
                });
                const data = await response.json();

                if (data.ok) {
                    is_changing = true;
                    change();
                } else {
                    alert(data.message)
                }
            } catch (err) {
                console.error(err);
                alert("系統錯誤，請稍後再試");
            }
        }
    })

    confirm_btn.addEventListener("click",async () => {
        let message = "";
        if(name.value.includes(' ')){
            name.value = data.username;
            message += "帳戶名稱不得有空格\n";
        }
        if(name.value=""){
            
        }
    })
});
