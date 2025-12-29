
export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function authHeaders(extra = {}) { //extra為想放的headers
    const token = getToken();
    if(token) return { ...extra, Authorization: `Bearer ${token}` };
    else return extra;
}

export async function api(path, options = {}) {
    const res = await fetch(`${window.API_BASE}${path}`, { //不用在加api_base
        ...options,
        headers: authHeaders(options.headers || {}),
    });
    return res;
}

export async function requireLogin(redirectTo = "/") {
    const res = await api("/api/me", { method: "GET" });
    const data = await res.json();
    if (!data.logged_in) {
        clearToken();
        window.location.href = redirectTo;
        return null;
    }
    return data; // {logged_in, username}
}

export async function login(username, password) {
    console.log(window.API_BASE);
    const payload = {
        username: username,
        password: password,
    };
    const res = await fetch(`${window.API_BASE}/api/login`, { method: "POST",headers:{"Content-Type": "application/json"}, body : JSON.stringify(payload),});
    const data = await res.json();
    if (!res.ok || !data.ok || !data.token) return { ok: false, data };
    setToken(data.token);
    return { ok: true, data };
}

export function logout(redirectTo = "/") {
    clearToken();
    window.location.href = redirectTo;
}

export async function change_password(name, current_password, new_password) {
    const payload = {
        name: name,
        current_password: current_password,
        new_password: new_password,
    };
    const res = await api("/api/me/password", { method: "PATCH",headers:{"Content-Type": "application/json"}, body : JSON.stringify(payload),});
    const data = await res.json();
    if (!data.ok) return { ok: false, error: data.error };
    return { ok: true, data: data.data };
}

export async function get_universities() {
    const res = await api("/api/universities", { method: "GET" });
    const data = await res.json();
    if (!data.ok) return { ok: false, error: data.error };
    return { ok: true, data: data.data };
}

export async function get_subjects(university) {
    const res = await api(`/api/${university}/subjects`, { method: "GET" });
    const data = await res.json();
    if (!data.ok) return { ok: false, error: data.error };
    return { ok: true, data: data.data };
}

//loading

export function showLoading() {
    const el = document.getElementById("loading");
    if (el) el.style.display = "flex";
}
export function hideLoading() {
    const el = document.getElementById("loading");
    if (el) el.style.display = "none";
}

//password檢查規範

export function validateNoEmptyNoSpace(value) {
    // 轉成字串，避免傳到 null/undefined/number 直接爆掉
    const str = String(value ?? "");

    // 1) 不能為空（只要全是空白也算空）
    if (str.trim().length === 0) {
        return { ok: false, message: "不能為空", value: str };
    }

    // 2) 不能有任何空白字元：包含半形空格、全形空格(U+3000)、tab、換行等
    // \s 會抓到多數空白；另外再加上 \u3000 防全形空格
    if (/[\s\u3000]/.test(str)) {
        return { ok: false, message: "不能包含空格（半形/全形皆不行）", value: str };
    }

    return { ok: true, message: "OK", value: str };
}