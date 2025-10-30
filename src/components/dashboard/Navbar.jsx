import React from "react";
import { getCurrentUser, logout } from "../../lib/auth";

export default function Navbar({ onLogout }) {
  const user = getCurrentUser();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-black via-gray-900 to-black border-b border-yellow-600 shadow-md">
      {/* Left: Logo + Tagline */}
      <div className="flex items-center gap-4">
        <div className="text-yellow-400 font-extrabold text-2xl tracking-wide hover:text-yellow-300 cursor-pointer transition">
          RezeX
        </div>
        <span className="hidden md:inline text-gray-400 text-sm italic">
          Black & Yellow Dashboard
        </span>
      </div>

      {/* Right: User info + Logout */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end text-right">
          <span className="text-gray-300 font-medium">
            {user?.name || user?.email}
          </span>
          <span className="text-yellow-500 text-xs">Online</span>
        </div>
        <button
          onClick={() => {
            logout();
            onLogout?.();
          }}
          className="px-4 py-1 border border-yellow-500 rounded-lg text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
