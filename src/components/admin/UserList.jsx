import React, { useState } from "react";
import EditUserModal from "./EditUserModal";

export default function UserList({ users, setUsers, autoApproval }) {
  const [selected, setSelected] = useState(null);

  const approveUser = (id) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, approved: true } : u)));
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="bg-[#1e1e1e] p-4 rounded-2xl border border-yellow-600 mt-6">
      <h2 className="text-lg font-semibold text-yellow-400 mb-2">User List</h2>
      <table className="w-full text-sm text-gray-300">
        <thead>
          <tr className="border-b border-gray-700 text-yellow-400">
            <th className="p-2 text-left">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Plan</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-gray-800">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.plan}</td>
              <td className="p-2">${u.amount}</td>
              <td className="p-2">
                {u.approved ? (
                  <span className="text-green-400 font-semibold">Approved</span>
                ) : (
                  <span className="text-red-400 font-semibold">Pending</span>
                )}
              </td>
              <td className="p-2 flex gap-2 justify-center">
                {!u.approved && !autoApproval && (
                  <button
                    onClick={() => approveUser(u.id)}
                    className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded text-xs"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => setSelected(u)}
                  className="px-2 py-1 bg-yellow-500 hover:bg-yellow-400 text-black rounded text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(u.id)}
                  className="px-2 py-1 bg-red-600 hover:bg-red-500 rounded text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <EditUserModal
          user={selected}
          setUser={setSelected}
          setUsers={setUsers}
          users={users}
        />
      )}
    </div>
  );
}
