import React, { useEffect, useRef } from "react";

export default function TradingViewWidget({ symbol = "BINANCE:BTCUSDT" }) {
  const ref = useRef(null);
  useEffect(() => {
    const id = "tradingview-widget-script";
    function init() {
      if (!window.TradingView) return;
      // clear container
      if (ref.current) ref.current.innerHTML = "";
      new window.TradingView.widget({
        autosize: true,
        symbol,
        interval: "60",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        container_id: ref.current.id,
      });
    }

    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://s3.tradingview.com/tv.js";
      s.onload = init;
      document.body.appendChild(s);
    } else {
      init();
    }

    return () => {
      if (ref.current) ref.current.innerHTML = "";
    };
  }, [symbol]);

  return (
    <div
      id={`tv_${symbol}`}
      ref={ref}
      style={{ height: 520 }}
      className="rounded-lg overflow-hidden bg-black"
    />
  );
}
