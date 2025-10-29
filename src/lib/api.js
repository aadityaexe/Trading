// lib/api.js
// Replace with real APIs when ready.

export async function generateDepositAddress({ symbol, userId }) {
  // Call your backend endpoint here. This is a stub.
  await new Promise((r) => setTimeout(r, 300));
  return {
    ok: true,
    address: `${symbol}_ADDR_${Math.random()
      .toString(36)
      .slice(2, 12)
      .toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };
}

// Simple in-memory simulated price generator
let listeners = [];
const base = { BTC: 60000, ETH: 3500, LTC: 180 };
let current = { ...base };

export function startPriceFeed(fn) {
  listeners.push(fn);
  // immediately emit current
  fn(current);
  if (listeners.length === 1) {
    // start interval
    window.__PRICE_INTERVAL__ = setInterval(() => {
      Object.keys(current).forEach((k) => {
        const delta =
          (Math.random() - 0.5) * (k === "BTC" ? 300 : k === "ETH" ? 20 : 5);
        current[k] = Math.max(
          0.01,
          Math.round((current[k] + delta) * 100) / 100
        );
      });
      listeners.forEach((l) => l(current));
    }, 1500);
  }
  return () => {
    // unsubscribe
    listeners = listeners.filter((l) => l !== fn);
    if (listeners.length === 0 && window.__PRICE_INTERVAL__) {
      clearInterval(window.__PRICE_INTERVAL__);
      delete window.__PRICE_INTERVAL__;
    }
  };
}
