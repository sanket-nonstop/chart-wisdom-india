import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const patterns = [
  {
    name: "Hammer",
    stock: "RELIANCE",
    timeframe: "Daily",
    type: "Bullish" as const,
    description: "A Hammer candle appeared at ₹2,400 support on Reliance. The long lower wick shows buyers rejected lower prices — institutional demand stepped in.",
    psychology: "Sellers pushed price down during the session, but buyers overwhelmed them by close. Think of it as: 'Yahan se price bounce karna chahta hai.'",
  },
];

export const PatternOfTheDay = () => {
  const pattern = patterns[0];

  return (
    <section className="py-20">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="chart-surface p-8 md:p-12 relative overflow-hidden"
        >
          {/* Glow effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-bull/5 rounded-full blur-[80px]" />

          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
              Pattern of the Day
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-10 relative z-10">
            {/* Candle Visualization */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="flex flex-col items-center">
                  <div className="w-[3px] h-8 bg-bull/50 rounded-full" />
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: 32 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="w-16 bg-bull rounded glow-bull"
                  />
                  <div className="w-[3px] h-24 bg-bull/50 rounded-full" />
                </div>

                {/* Labels */}
                <div className="absolute -right-32 top-0 flex items-center gap-2">
                  <div className="w-8 h-[1px] bg-foreground/20" />
                  <span className="text-xs font-mono text-muted-foreground">High</span>
                </div>
                <div className="absolute -right-32 top-10 flex items-center gap-2">
                  <div className="w-8 h-[1px] bg-bull/40" />
                  <span className="text-xs font-mono text-bull">Close</span>
                </div>
                <div className="absolute -right-32 bottom-0 flex items-center gap-2">
                  <div className="w-8 h-[1px] bg-foreground/20" />
                  <span className="text-xs font-mono text-muted-foreground">Low</span>
                </div>
                <div className="absolute -left-28 top-8 flex items-center gap-2">
                  <span className="text-xs font-mono text-bull">Open</span>
                  <div className="w-8 h-[1px] bg-bull/40" />
                </div>
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-3xl font-bold">{pattern.name}</h3>
                <span className="px-3 py-1 text-xs font-mono rounded-full bg-bull/10 text-bull border border-bull/20">
                  {pattern.type}
                </span>
              </div>

              <div className="flex gap-3 mb-6">
                <span className="px-2 py-1 text-xs font-mono rounded bg-muted text-muted-foreground">
                  {pattern.stock}
                </span>
                <span className="px-2 py-1 text-xs font-mono rounded bg-muted text-muted-foreground">
                  {pattern.timeframe}
                </span>
                <span className="px-2 py-1 text-xs font-mono rounded bg-muted text-muted-foreground">
                  Equity
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4">
                {pattern.description}
              </p>

              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  Psychology
                </span>
                <p className="text-sm mt-2 leading-relaxed">
                  {pattern.psychology}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
