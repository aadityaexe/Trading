import React, { useState } from "react";

export default function EditUserModal({ user, setUser, users, setUsers }) {
  const [form, setForm] = useState({ ...user });

  const save = () => {
    setUsers(users.map((u) => (u.id === user.id ? form : u)));
    setUser(null);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] p-6 rounded-lg border border-yellow-600 w-full max-w-sm">
        <h2 className="text-lg font-semibold text-yellow-400 mb-4">
          Edit User
        </h2>

        <label className="text-sm text-gray-300">Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 rounded bg-gray-900 text-gray-100 mb-3"
        />

        <label className="text-sm text-gray-300">Plan</label>
        <select
          value={form.plan}
          onChange={(e) => setForm({ ...form, plan: e.target.value })}
          className="w-full p-2 rounded bg-gray-900 text-gray-100 mb-3"
        >
          <option>Bronze</option>
          <option>Silver</option>
          <option>Gold</option>
          <option>Platinum</option>
        </select>

        <label className="text-sm text-gray-300">Amount ($)</label>
        <input
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: +e.target.value })}
          className="w-full p-2 rounded bg-gray-900 text-gray-100 mb-3"
        />

        <label className="text-sm text-gray-300">Status</label>
        <select
          value={form.approved}
          onChange={(e) =>
            setForm({ ...form, approved: e.target.value === "true" })
          }
          className="w-full p-2 rounded bg-gray-900 text-gray-100 mb-3"
        >
          <option value={true}>Approved</option>
          <option value={false}>Pending</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setUser(null)}
            className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
