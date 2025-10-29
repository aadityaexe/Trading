// lib/auth.js
const USER_KEY = "demo_user";

export function signup({ email, password, name }) {
  // Very simple: store user in localStorage. Replace with real backend.
  const id = "u_" + Math.random().toString(36).slice(2, 10);
  const user = { id, email, name, password }; // note: DO NOT store plaintext password in prod
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return { ok: true, user };
}

export function login({ email, password }) {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return { ok: false, error: "No user found. Please sign up." };
  const user = JSON.parse(raw);
  if (user.email === email && user.password === password) {
    // create a session token (mock)
    localStorage.setItem(
      "session",
      JSON.stringify({
        token: "TOK_" + Math.random().toString(36).slice(2),
        user,
      })
    );
    return { ok: true, user };
  }
  return { ok: false, error: "Invalid credentials" };
}

export function logout() {
  localStorage.removeItem("session");
}

export function getCurrentUser() {
  const s = localStorage.getItem("session");
  if (!s) return null;
  try {
    return JSON.parse(s).user;
  } catch {
    return null;
  }
}
