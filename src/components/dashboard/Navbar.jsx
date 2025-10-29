import React from "react";
import { getCurrentUser, logout } from "../../lib/auth";

export default function Navbar({ onLogout }) {
  const user = getCurrentUser();
  return (
    <header className="flex items-center justify-between p-4 bg-[#0b0b0b] border-b border-yellow-700">
      <div className="flex items-center gap-3">
        <div className="text-yellow-400 font-bold text-xl">RezeX</div>
        <div className="text-sm text-gray-400 hidden md:block">
          Black & Yellow Dashboard
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-300">{user?.name || user?.email}</div>
        <button
          onClick={() => {
            logout();
            onLogout?.();
          }}
          className="text-sm bg-transparent border border-yellow-500 px-3 py-1 rounded hover:bg-yellow-500 hover:text-black"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
