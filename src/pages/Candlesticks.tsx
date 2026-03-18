import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CandlestickCard, candlestickPatterns } from "@/components/CandlestickCard";
import { motion } from "framer-motion";

const Candlesticks = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <span className="text-xs font-mono text-primary uppercase tracking-widest mb-2 block">
              Module 1 • Beginner
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Candlestick Patterns
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Each candle tells a story of the battle between buyers and sellers.
              Learn to read these stories using real Indian market examples.
            </p>
          </motion.div>

          {/* Candle Anatomy intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="chart-surface p-6 md:p-8 mb-8"
          >
            <h2 className="text-xl font-bold mb-4">Anatomy of a Candlestick</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center gap-16">
                {/* Bullish candle */}
                <div className="text-center">
                  <div className="flex flex-col items-center mb-3">
                    <div className="w-[2px] h-8 bg-bull/40" />
                    <div className="w-12 h-16 bg-bull rounded-sm glow-bull" />
                    <div className="w-[2px] h-12 bg-bull/40" />
                  </div>
                  <span className="text-xs font-mono text-bull">Bullish</span>
                  <p className="text-xs text-muted-foreground mt-1">Close &gt; Open</p>
                </div>
                {/* Bearish candle */}
                <div className="text-center">
                  <div className="flex flex-col items-center mb-3">
                    <div className="w-[2px] h-12 bg-bear/40" />
                    <div className="w-12 h-16 bg-bear rounded-sm glow-bear" />
                    <div className="w-[2px] h-8 bg-bear/40" />
                  </div>
                  <span className="text-xs font-mono text-bear">Bearish</span>
                  <p className="text-xs text-muted-foreground mt-1">Close &lt; Open</p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><span className="text-foreground font-medium">Body:</span> The thick part — distance between Open and Close.</p>
                <p><span className="text-foreground font-medium">Wicks (Shadows):</span> The thin lines — show the High and Low of the session.</p>
                <p><span className="text-foreground font-medium">Green/Bullish:</span> Close is above Open — buyers won.</p>
                <p><span className="text-foreground font-medium">Red/Bearish:</span> Close is below Open — sellers won.</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            {candlestickPatterns.map((pattern, i) => (
              <CandlestickCard key={pattern.name} pattern={pattern} index={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Candlesticks;
