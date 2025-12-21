
export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function authHeaders(extra = {}) {
    const token = getToken();
    return token ? { ...extra, Authorization: `Bearer ${token}` } : extra;
}

export async function api(path, options = {}) {
    const res = await fetch(`${window.API_BASE}${path}`, {
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

export async function login(name, password) {
    console.log(window.API_BASE);
    const body = JSON.stringify({ name, password });
    const res = await fetch(`${window.API_BASE}/api/login`, { method: "POST", body });
    const data = await res.json();
    if (!res.ok || !data.ok || !data.token) return { ok: false, data };
    setToken(data.token);
    return { ok: true, data };
}

export function logout(redirectTo = "/") {
    clearToken();
    window.location.href = redirectTo;
}