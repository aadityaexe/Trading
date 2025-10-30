import React from "react";

export default function TransactionList({ transactions }) {
  return (
    <div className="bg-gray-900 border border-yellow-600 p-4 rounded-lg">
      <h2 className="text-lg sm:text-xl text-yellow-400 font-semibold mb-3">
        Transaction History
      </h2>

      <ul className="divide-y divide-gray-700">
        {transactions.length ? (
          transactions.map((t, i) => (
            <li
              key={i}
              className="flex justify-between py-2 text-sm sm:text-base"
            >
              <span
                className={t.type === "add" ? "text-green-400" : "text-red-400"}
              >
                {t.type === "add" ? "Added" : "Withdrawn"} ${t.amount}
              </span>
              <span className="text-gray-400">{t.date}</span>
            </li>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No transactions yet.</p>
        )}
      </ul>
    </div>
  );
}
