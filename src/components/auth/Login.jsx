import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    const res = login({ email, password });
    if (res.ok) {
      nav("/");
    } else {
      setErr(res.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handle}
        className="w-full max-w-md bg-[#111] p-8 rounded-2xl border border-yellow-500"
      >
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Sign in</h2>
        {err && <div className="mb-2 text-red-400">{err}</div>}
        <label className="block mb-2 text-gray-300">Email</label>
        <input
          className="w-full mb-4 p-2 rounded bg-gray-900 text-gray-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 text-gray-300">Password</label>
        <input
          type="password"
          className="w-full mb-4 p-2 rounded bg-gray-900 text-gray-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full py-2 rounded bg-yellow-500 font-semibold">
          Sign in
        </button>

        <div className="mt-4 text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-yellow-400">
            Create one
          </Link>
        </div>
      </form>
    </div>
  );
}
