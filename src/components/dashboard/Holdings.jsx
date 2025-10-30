import React from "react";

export default function Holdings({ portfolio, totalValue }) {
  const fmt = (n) =>
    n >= 1
      ? n.toLocaleString(undefined, { maximumFractionDigits: 2 })
      : n.toFixed(6);

  return (
    <div className="space-y-4">
      {portfolio.map((p) => (
        <div
          key={p.symbol}
          className="group flex items-center justify-between bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 border border-yellow-600/50 hover:border-yellow-400/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]"
        >
          {/* Left: Symbol & Details */}
          <div className="flex flex-col">
            <div className="font-semibold text-yellow-400 text-lg tracking-wide flex items-center gap-2">
              {p.symbol}
              <span className="text-xs text-gray-400 font-normal">
                ({p.amount})
              </span>
            </div>
            <div className="text-sm text-gray-400">
              Price: <span className="text-gray-200">${fmt(p.price)}</span>
            </div>
          </div>

          {/* Right: Value & % */}
          <div className="text-right">
            <div className="font-bold text-yellow-300 text-lg">
              ${fmt(p.value)}
            </div>
            <div className="text-xs text-gray-400">
              {((p.value / totalValue) * 100 || 0).toFixed(2)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
