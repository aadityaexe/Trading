import React, { useState } from "react";

export default function InvestmentSection({ user, onTransaction }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("add");

  const handleSubmit = () => {
    if (!amount || isNaN(amount)) return;
    onTransaction(type, parseFloat(amount));
    setAmount("");
  };

  return (
    <div className="bg-gray-900 border border-yellow-600 p-4 rounded-lg">
      <h2 className="text-lg sm:text-xl text-yellow-400 font-semibold mb-3">
        Manage Funds
      </h2>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-black border border-yellow-600 p-2 rounded text-yellow-400"
        >
          <option value="add">Add Money</option>
          <option value="withdraw">Withdraw Money</option>
        </select>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount ($)"
          className="bg-black border border-yellow-600 p-2 rounded text-yellow-400 w-full sm:w-1/2"
        />

        <button
          onClick={handleSubmit}
          className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-400 w-full sm:w-auto"
        >
          {type === "add" ? "Add" : "Withdraw"}
        </button>
      </div>

      <div className="mt-3 text-sm text-gray-400">
        Current Balance:{" "}
        <span className="text-yellow-400 font-bold">${user.amount}</span>
      </div>
    </div>
  );
}
