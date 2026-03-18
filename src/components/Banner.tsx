import { motion } from "framer-motion";
import { TrendingUp, BookOpen, Zap } from "lucide-react";

const candles = [
  { h: 55, bull: false }, { h: 70, bull: true }, { h: 45, bull: true },
  { h: 80, bull: false }, { h: 60, bull: true }, { h: 90, bull: true },
  { h: 50, bull: false }, { h: 75, bull: true }, { h: 65, bull: true },
  { h: 85, bull: false }, { h: 40, bull: true }, { h: 72, bull: true },
];

const stats = [
  { icon: BookOpen, label: "Patterns", value: "50+" },
  { icon: TrendingUp, label: "Live Charts", value: "NSE/BSE" },
  { icon: Zap, label: "Quizzes", value: "Free" },
];

export const Banner = () => (
  <div className="relative overflow-hidden rounded-2xl border border-border bg-card mx-4 my-6">
    {/* Grid bg */}
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `linear-gradient(hsl(var(--chart-grid)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--chart-grid)) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    />

    {/* Blue glow */}
    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-primary/10 blur-[80px]" />

    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-8">
      {/* Left: Text */}
      <div className="flex-1 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 mb-4"
        >
          <TrendingUp className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold text-primary tracking-wide uppercase">
            Indian Stock Market Education
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-black leading-tight mb-3"
        >
          Read charts like a{" "}
          <span className="text-primary">pro trader.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm text-muted-foreground max-w-sm"
        >
          Master candlesticks, chart patterns & price action — built for the
          Indian market. Free. Visual. Practical.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex gap-6 mt-5 justify-center md:justify-start"
        >
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Icon className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold leading-none">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right: Animated candlestick chart */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex items-end gap-1.5 h-24 shrink-0"
      >
        {candles.map((c, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.04, ease: "easeOut" }}
            style={{ originY: 1 }}
            className="flex flex-col items-center gap-0.5"
          >
            <div
              className="w-[2px] rounded-full"
              style={{
                height: `${c.h * 0.25}px`,
                background: c.bull ? "hsl(var(--bull))" : "hsl(var(--bear))",
                opacity: 0.5,
              }}
            />
            <div
              className="w-3 rounded-sm"
              style={{
                height: `${c.h * 0.55}px`,
                background: c.bull
                  ? "hsl(var(--bull) / 0.7)"
                  : "hsl(var(--bear) / 0.7)",
                border: `1px solid ${c.bull ? "hsl(var(--bull))" : "hsl(var(--bear))"}`,
              }}
            />
            <div
              className="w-[2px] rounded-full"
              style={{
                height: `${c.h * 0.2}px`,
                background: c.bull ? "hsl(var(--bull))" : "hsl(var(--bear))",
                opacity: 0.5,
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>

    {/* Bottom accent line */}
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
  </div>
);
