import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TradingViewChart } from "@/components/TradingViewChart";
import { motion } from "framer-motion";
import { useState } from "react";

const symbols = [
  { label: "NIFTY 50", symbol: "NSE:NIFTY" },
  { label: "BANK NIFTY", symbol: "NSE:BANKNIFTY" },
  { label: "RELIANCE", symbol: "NSE:RELIANCE" },
  { label: "HDFC BANK", symbol: "NSE:HDFCBANK" },
  { label: "INFY", symbol: "NSE:INFY" },
  { label: "TCS", symbol: "NSE:TCS" },
];

const LiveCharts = () => {
  const [activeSymbol, setActiveSymbol] = useState(symbols[0]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="text-xs font-mono text-primary uppercase tracking-widest mb-2 block">
              Live Lab • Practice
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Live Chart Lab
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Observe real Indian market charts. Practice spotting patterns,
              support/resistance levels, and price action concepts.
            </p>
          </motion.div>

          {/* Symbol selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {symbols.map((s) => (
              <button
                key={s.symbol}
                onClick={() => setActiveSymbol(s)}
                className={`px-4 py-2 rounded-lg text-sm font-mono transition-colors press-effect ${
                  activeSymbol.symbol === s.symbol
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <TradingViewChart symbol={activeSymbol.symbol} height={550} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 chart-surface p-6"
          >
            <h3 className="font-semibold mb-3">How to Observe This Chart</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div>
                <span className="text-foreground font-medium block mb-1">1. Identify the Trend</span>
                Are the candles making higher highs and higher lows (uptrend), or lower highs and lower lows (downtrend)?
              </div>
              <div>
                <span className="text-foreground font-medium block mb-1">2. Find Key Levels</span>
                Look for horizontal areas where price has bounced or been rejected multiple times.
              </div>
              <div>
                <span className="text-foreground font-medium block mb-1">3. Spot Patterns</span>
                Can you see any candlestick patterns (Hammer, Doji) or chart patterns (Double Top, Triangle)?
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LiveCharts;
