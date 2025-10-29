import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import TradingViewWidget from "./TradingViewWidget";
import Holdings from "./Holdings";
import { getCurrentUser } from "../../lib/auth";
import { startPriceFeed, generateDepositAddress } from "../../lib/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();
  const user = getCurrentUser();
  const [prices, setPrices] = useState({ BTC: 60000, ETH: 3500, LTC: 180 });
  const [selected, setSelected] = useState("BTC");
  const [holdings, setHoldings] = useState([
    { symbol: "BTC", amount: 0.15 },
    { symbol: "ETH", amount: 2.1 },
    { symbol: "LTC", amount: 10 },
  ]);
  const [address, setAddress] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    // redirect if not logged in
    if (!user) nav("/login");
  }, [user, nav]);

  useEffect(() => {
    const off = startPriceFeed(setPrices);
    return off;
  }, []);

  const portfolio = useMemo(
    () =>
      holdings.map((h) => ({
        ...h,
        price: prices[h.symbol] || 0,
        value: (prices[h.symbol] || 0) * h.amount,
      })),
    [holdings, prices]
  );
  const totalValue = portfolio.reduce((s, p) => s + p.value, 0);

  async function handleGenerate() {
    setNotice("Generating address...");
    const res = await generateDepositAddress({
      symbol: selected,
      userId: user?.id,
    });
    if (res.ok) {
      setAddress(res.address);
      setNotice(
        "Address generated (demo). Payments should be routed to admin wallet in backend."
      );
    } else {
      setNotice("Failed to generate address");
    }
    setTimeout(() => setNotice(""), 4000);
  }

  function handleLogout() {
    nav("/login");
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar onLogout={handleLogout} />
      <main className="p-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section className="lg:col-span-2 bg-[#1e1e1e] rounded-2xl p-4 shadow-lg border border-yellow-500">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              Live Market
            </h2>
            <div className="flex items-center gap-2">
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="bg-gray-800 rounded border border-yellow-500 px-2 py-1"
              >
                {Object.keys(prices).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <TradingViewWidget symbol={`BINANCE:${selected}USDT`} />

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-gray-900 p-3 rounded border border-yellow-400">
              <div className="text-sm text-gray-300">Total Value</div>
              <div className="text-lg font-bold text-yellow-400">
                $
                {totalValue.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="bg-gray-900 p-3 rounded border border-yellow-400">
              <div className="text-sm text-gray-300">Positions</div>
              <div className="text-lg font-bold text-yellow-400">
                {holdings.length}
              </div>
            </div>
            <div className="bg-gray-900 p-3 rounded border border-yellow-400">
              <div className="text-sm text-gray-300">Updated</div>
              <div className="text-lg font-bold text-yellow-400">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </section>

        <aside className="bg-[#1e1e1e] rounded-2xl p-4 shadow-lg border border-yellow-500">
          <h3 className="text-lg font-semibold mb-2 text-yellow-400">
            Your Holdings
          </h3>

          <Holdings portfolio={portfolio} totalValue={totalValue} />

          <div className="mt-4">
            <h4 className="text-sm text-gray-300 mb-2">Actions</h4>
            <div className="flex gap-2">
              <button className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black py-2 rounded font-semibold">
                Deposit
              </button>
              <button className="flex-1 bg-yellow-700 hover:bg-yellow-600 text-white py-2 rounded font-semibold">
                Withdraw
              </button>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm text-gray-300 mb-2">
              Generate New Crypto Address
            </h4>
            <div className="flex gap-2">
              <button
                onClick={handleGenerate}
                className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black py-2 rounded font-semibold"
              >
                Generate Address
              </button>
            </div>
            {notice && (
              <div className="mt-2 text-sm text-gray-300">{notice}</div>
            )}
            {address && (
              <div className="mt-3 text-sm text-gray-200 break-all">
                <strong className="text-yellow-400">New Address:</strong>{" "}
                {address}
              </div>
            )}
          </div>

          <div className="mt-4 text-xs text-gray-400 border-t border-gray-700 pt-2">
            Demo app: connect actual backend (auth, address generation, routing
            to admin wallet) and replace price simulator with real
            WebSocket/Binance feed for production.
          </div>
        </aside>
      </main>
    </div>
  );
}
