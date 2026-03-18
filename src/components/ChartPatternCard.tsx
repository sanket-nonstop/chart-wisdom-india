import { motion } from "framer-motion";
import { useState } from "react";

export interface ChartPatternData {
  name: string;
  type: "reversal" | "continuation";
  description: string;
  steps: string[];
  stock: string;
  hinglish?: string;
}

export const chartPatterns: ChartPatternData[] = [
  {
    name: "Head & Shoulders",
    type: "reversal",
    description: "Three peaks where the middle peak (head) is higher than the two outer peaks (shoulders). It signals a bearish reversal after an uptrend.",
    steps: [
      "Price makes a high (Left Shoulder)",
      "Price makes a higher high (Head)",
      "Price makes a lower high (Right Shoulder)",
      "Price breaks below the neckline — reversal confirmed",
    ],
    stock: "RELIANCE on Daily Chart",
    hinglish: "Teen peaks bante hain — beech wala sabse bada. Jab neckline tootey, toh selling aati hai.",
  },
  {
    name: "Double Top",
    type: "reversal",
    description: "Price hits the same resistance level twice and fails to break through. Classic bearish reversal pattern.",
    steps: [
      "Price reaches a high and pulls back",
      "Price rises again to the same level",
      "Fails to break above — sellers reject it again",
      "Price breaks support — reversal confirmed",
    ],
    stock: "NIFTY 50 at 19,800",
    hinglish: "Price do baar same level pe takra ke neeche aata hai. Matlab sellers bahut strong hain wahan.",
  },
  {
    name: "Double Bottom",
    type: "reversal",
    description: "Price hits the same support level twice and bounces. Classic bullish reversal pattern — the 'W' shape.",
    steps: [
      "Price drops to a support level and bounces",
      "Price drops again to the same support",
      "Buyers step in again — double rejection of lower prices",
      "Price breaks above resistance — bullish reversal",
    ],
    stock: "HDFC BANK at ₹1,520",
    hinglish: "Price do baar neeche girke wapas aata hai — 'W' shape banta hai. Buyers strong hain.",
  },
  {
    name: "Ascending Triangle",
    type: "continuation",
    description: "Flat resistance with rising support (higher lows). Buyers are getting more aggressive. Usually breaks upward.",
    steps: [
      "Price hits resistance and pulls back",
      "Each pullback makes a higher low",
      "Buyers are pushing harder each time",
      "Eventually breaks above resistance — bullish breakout",
    ],
    stock: "TCS on 15m Timeframe",
    hinglish: "Resistance flat hai par support upar utha raha hai. Buyers ka pressure badh raha hai.",
  },
  {
    name: "Descending Triangle",
    type: "continuation",
    description: "Flat support with falling resistance (lower highs). Sellers are getting more aggressive. Usually breaks downward.",
    steps: [
      "Price bounces from support",
      "Each bounce makes a lower high",
      "Sellers are pushing harder each time",
      "Support breaks — bearish breakdown",
    ],
    stock: "BANKNIFTY on Hourly",
    hinglish: "Support flat hai par resistance neeche aa raha hai. Sellers ka pressure badh raha hai.",
  },
  {
    name: "Flag & Pennant",
    type: "continuation",
    description: "After a strong move, price consolidates in a small channel (flag) or triangle (pennant) before continuing the trend.",
    steps: [
      "Strong impulsive move (the 'flagpole')",
      "Price consolidates in a tight channel/triangle",
      "Volume decreases during consolidation",
      "Breakout continues in the original direction",
    ],
    stock: "INFY after Q3 Results",
    hinglish: "Ek strong move ke baad price rest leta hai — phir same direction mein aage jaata hai.",
  },
];

export const ChartPatternCard = ({ pattern, index }: { pattern: ChartPatternData; index: number }) => {
  const [showHinglish, setShowHinglish] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="chart-surface p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <h3 className="text-2xl font-bold">{pattern.name}</h3>
        <span className={`px-3 py-1 text-xs font-mono rounded-full border ${
          pattern.type === "reversal"
            ? "bg-bear/10 text-bear border-bear/20"
            : "bg-bull/10 text-bull border-bull/20"
        }`}>
          {pattern.type}
        </span>
        <span className="px-2 py-1 text-xs font-mono rounded bg-muted text-muted-foreground">
          {pattern.stock}
        </span>
      </div>

      <p className="text-muted-foreground leading-relaxed mb-6">
        {pattern.description}
      </p>

      <div className="mb-4">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3 block">
          How It Forms
        </span>
        <div className="space-y-2">
          {pattern.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-mono flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {pattern.hinglish && (
        <button
          onClick={() => setShowHinglish(!showHinglish)}
          className="text-xs font-mono text-primary hover:text-primary/80 transition-colors press-effect"
        >
          {showHinglish ? "Hide Hinglish" : "Show Hinglish Explanation"}
        </button>
      )}
      {showHinglish && pattern.hinglish && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 p-4 rounded-xl bg-muted/50 border border-border"
        >
          <p className="text-sm leading-relaxed">{pattern.hinglish}</p>
        </motion.div>
      )}
    </motion.div>
  );
};
