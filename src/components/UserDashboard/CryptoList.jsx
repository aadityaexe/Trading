import React from "react";
import { getCryptoList } from "../../lib/cryptoData";

export default function CryptoList() {
  const cryptos = getCryptoList();

  return (
    <div className="bg-gray-900 border border-yellow-600 p-4 rounded-lg">
      <h2 className="text-lg sm:text-xl text-yellow-400 font-semibold mb-3">
        Available Cryptos
      </h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {cryptos.map((coin) => (
          <div
            key={coin.symbol}
            className="bg-black border border-yellow-600 rounded-lg p-3 flex justify-between items-center"
          >
            <span className="font-semibold text-yellow-400">{coin.name}</span>
            <span className="text-gray-400">${coin.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
