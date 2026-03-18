import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, BookOpen, Zap, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const candles = [
  { body: 30, wick: 10, tail: 8,  bull: false },
  { body: 45, wick: 12, tail: 10, bull: true  },
  { body: 25, wick: 8,  tail: 6,  bull: true  },
  { body: 55, wick: 15, tail: 12, bull: false },
  { body: 38, wick: 10, tail: 8,  bull: true  },
  { body: 60, wick: 18, tail: 14, bull: true  },
  { body: 32, wick: 9,  tail: 7,  bull: false },
  { body: 50, wick: 14, tail: 11, bull: true  },
  { body: 42, wick: 11, tail: 9,  bull: true  },
  { body: 65, wick: 20, tail: 15, bull: false },
  { body: 28, wick: 8,  tail: 6,  bull: true  },
  { body: 48, wick: 13, tail: 10, bull: true  },
];

const stats = [
  { icon: BookOpen,  value: "50+",     label: "Patterns" },
  { icon: BarChart2, value: "NSE/BSE", label: "Live Charts" },
  { icon: Zap,       value: "Free",    label: "Always" },
  { icon: TrendingUp,value: "10K+",    label: "Learners" },
];

export const Hero = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    {/* Grid */}
    <div
      className="absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage: `linear-gradient(hsl(var(--chart-grid)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--chart-grid)) 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
      }}
    />

    {/* Glow orbs */}
    <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[130px] -translate-x-1/3 -translate-y-1/3" />
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-bull/5 blur-[100px] translate-x-1/4 translate-y-1/4" />

    <div className="container relative z-10 px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT: Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-bull animate-pulse" />
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">
              Indian Stock Market · Price Action
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.92] mb-6"
          >
            Charts don't lie.
            <br />
            <span className="text-primary">Learn to listen.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-md mb-8 leading-relaxed"
          >
            Master candlesticks, chart patterns & price action — built
            specifically for the Indian market. Visual. Practical. Free.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button asChild size="lg" className="press-effect glow-accent px-8 py-6 text-base">
              <Link to="/candlesticks">
                Start Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="press-effect px-8 py-6 text-base">
              <Link to="/live-charts">Explore Live Charts</Link>
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-4 gap-4 mt-10 pt-8 border-t border-border"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <Icon className="h-4 w-4 text-primary mx-auto mb-1.5 opacity-70" />
                <p className="text-lg font-black">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: Chart panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="hidden lg:block"
        >
          <div className="relative rounded-2xl border border-border bg-card p-6 overflow-hidden">
            {/* Chart header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-muted-foreground font-mono">NIFTY 50 · 1D</p>
                <p className="text-2xl font-black">22,450.30</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-bull/15 text-bull text-sm font-bold">
                +1.24%
              </span>
            </div>

            {/* Candlestick chart */}
            <div className="flex items-end gap-2 h-36 mb-4">
              {candles.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.05, ease: "easeOut" }}
                  style={{ originY: 1 }}
                  className="flex flex-col items-center flex-1"
                >
                  <div
                    className="w-[2px] rounded-full mx-auto"
                    style={{
                      height: `${c.wick}px`,
                      background: c.bull ? "hsl(var(--bull))" : "hsl(var(--bear))",
                      opacity: 0.6,
                    }}
                  />
                  <div
                    className="w-full rounded-sm"
                    style={{
                      height: `${c.body}px`,
                      background: c.bull ? "hsl(var(--bull) / 0.25)" : "hsl(var(--bear) / 0.25)",
                      border: `1.5px solid ${c.bull ? "hsl(var(--bull))" : "hsl(var(--bear))"}`,
                    }}
                  />
                  <div
                    className="w-[2px] rounded-full mx-auto"
                    style={{
                      height: `${c.tail}px`,
                      background: c.bull ? "hsl(var(--bull))" : "hsl(var(--bear))",
                      opacity: 0.6,
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Volume bars */}
            <div className="flex items-end gap-2 h-8">
              {candles.map((c, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${20 + Math.random() * 12}px`,
                    background: c.bull ? "hsl(var(--bull) / 0.2)" : "hsl(var(--bear) / 0.2)",
                  }}
                />
              ))}
            </div>

            {/* Pattern label */}
            <div className="mt-5 flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
              <TrendingUp className="h-3.5 w-3.5 text-primary shrink-0" />
              <p className="text-xs text-primary font-medium">
                Pattern detected: <span className="font-bold">Bullish Engulfing</span>
              </p>
            </div>

            {/* Inner glow */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-[60px]" />
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);
