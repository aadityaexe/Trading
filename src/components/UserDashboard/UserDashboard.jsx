import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import InvestmentSection from "./InvestmentSection";
import CryptoList from "./CryptoList";
import TransactionList from "./TransactionList";
import { getUserData, updateUser, addTransaction } from "../../lib/userData";

export default function UserDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = getUserData();
    setUser(data);
  }, []);

  const handleUpdateUser = (updates) => {
    const updated = updateUser(updates);
    setUser(updated);
  };

  const handleAddTransaction = (type, amount) => {
    const updated = addTransaction(type, amount);
    setUser(updated);
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-yellow-400">
        Loading your data...
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-gray-100 p-3 sm:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-yellow-400 text-center sm:text-left">
        Welcome, {user.name}
      </h1>

      <UserProfile user={user} onUpdate={handleUpdateUser} />
      <InvestmentSection user={user} onTransaction={handleAddTransaction} />
      <CryptoList />
      <TransactionList transactions={user.transactions} />
    </div>
  );
}
