import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChartPatternCard, chartPatterns } from "@/components/ChartPatternCard";
import { motion } from "framer-motion";

const ChartPatterns = () => {
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
              Module 2 • Beginner
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Chart Patterns
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Patterns repeat because human psychology repeats. Learn to spot
              these formations on NIFTY, BANKNIFTY, and Nifty 50 stocks.
            </p>
          </motion.div>

          <div className="space-y-6">
            {chartPatterns.map((pattern, i) => (
              <ChartPatternCard key={pattern.name} pattern={pattern} index={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChartPatterns;
