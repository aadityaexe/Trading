import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import AdminSettings from "./AdminSettings";
import { getAllUsers, updateUser, deleteUser } from "../../lib/adminData";

export default function AdminDashboard() {
  const [autoApproval, setAutoApproval] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(getAllUsers());
  }, []);

  const totalInvestment = users.reduce(
    (sum, u) => sum + (u.approved ? u.amount : 0),
    0
  );
  const approvedCount = users.filter((u) => u.approved).length;

  const handleUpdate = (id, updates) => {
    const updated = updateUser(id, updates);
    setUsers(updated);
  };

  const handleDelete = (id) => {
    const updated = deleteUser(id);
    setUsers(updated);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 p-3 sm:p-6">
      {/* Header */}
      <h1 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 text-center sm:text-left">
        Admin Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-900 p-3 sm:p-4 rounded-lg border border-yellow-600 text-center sm:text-left">
          <div className="text-xs sm:text-sm text-gray-400">Total Users</div>
          <div className="text-base sm:text-lg font-bold text-yellow-400">
            {users.length}
          </div>
        </div>

        <div className="bg-gray-900 p-3 sm:p-4 rounded-lg border border-yellow-600 text-center sm:text-left">
          <div className="text-xs sm:text-sm text-gray-400">Approved</div>
          <div className="text-base sm:text-lg font-bold text-yellow-400">
            {approvedCount}
          </div>
        </div>

        <div className="bg-gray-900 p-3 sm:p-4 rounded-lg border border-yellow-600 text-center sm:text-left">
          <div className="text-xs sm:text-sm text-gray-400">Pending</div>
          <div className="text-base sm:text-lg font-bold text-yellow-400">
            {users.length - approvedCount}
          </div>
        </div>

        <div className="bg-gray-900 p-3 sm:p-4 rounded-lg border border-yellow-600 text-center sm:text-left">
          <div className="text-xs sm:text-sm text-gray-400">
            Total Investment
          </div>
          <div className="text-base sm:text-lg font-bold text-yellow-400">
            ${totalInvestment}
          </div>
        </div>
      </div>

      {/* Admin Settings Section */}
      <div className="mb-6">
        <AdminSettings
          autoApproval={autoApproval}
          setAutoApproval={setAutoApproval}
        />
      </div>

      {/* User List Section */}
      <div className="overflow-x-auto bg-gray-900 p-3 sm:p-4 rounded-lg border border-yellow-600">
        <UserList
          users={users}
          setUsers={setUsers}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}
