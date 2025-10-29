import React from "react";

export default function Holdings({ portfolio, totalValue }) {
  const fmt = (n) =>
    n >= 1
      ? n.toLocaleString(undefined, { maximumFractionDigits: 2 })
      : n.toFixed(6);
  return (
    <div className="space-y-3">
      {portfolio.map((p) => (
        <div
          key={p.symbol}
          className="flex items-center justify-between bg-gray-800 rounded p-3 border border-yellow-600"
        >
          <div>
            <div className="font-medium text-yellow-400">
              {p.symbol}{" "}
              <span className="text-xs text-gray-400">({p.amount})</span>
            </div>
            <div className="text-sm text-gray-300">Price: ${fmt(p.price)}</div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-yellow-400">${fmt(p.value)}</div>
            <div className="text-xs text-gray-400">
              {((p.value / totalValue) * 100 || 0).toFixed(2)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
