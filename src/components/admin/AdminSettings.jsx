import React from "react";

export default function AdminSettings({ autoApproval, setAutoApproval }) {
  return (
    <div className="bg-[#1e1e1e] p-4 rounded-2xl border border-yellow-600 mb-4">
      <h3 className="text-lg font-semibold text-yellow-400 mb-2">
        Admin Settings
      </h3>
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Auto Approval Mode:</span>
        <button
          onClick={() => setAutoApproval(!autoApproval)}
          className={`px-3 py-1 rounded font-semibold ${
            autoApproval ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {autoApproval ? "Enabled" : "Disabled"}
        </button>
      </div>
    </div>
  );
}
