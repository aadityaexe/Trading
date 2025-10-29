import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../../lib/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    signup({ email, password, name });
    nav("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handle}
        className="w-full max-w-md bg-[#111] p-8 rounded-2xl border border-yellow-500"
      >
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
          Create account
        </h2>

        <label className="block mb-2 text-gray-300">Full name</label>
        <input
          className="w-full mb-4 p-2 rounded bg-gray-900 text-gray-100"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          Sign up
        </button>

        <div className="mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
