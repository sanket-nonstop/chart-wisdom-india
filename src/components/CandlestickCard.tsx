import { motion } from "framer-motion";
import { useState } from "react";

interface CandlestickData {
  name: string;
  type: "bullish" | "bearish" | "neutral";
  description: string;
  psychology: string;
  hinglish?: string;
  stock: string;
  wickTop: number;
  bodyHeight: number;
  wickBottom: number;
  bodyPosition?: "top" | "bottom" | "middle";
}

export const candlestickPatterns: CandlestickData[] = [
  {
    name: "Doji",
    type: "neutral",
    description: "Open and Close are nearly equal. The market is undecided — neither buyers nor sellers are in control.",
    psychology: "A tug-of-war between buyers and sellers ended in a draw. Watch the next candle for direction.",
    hinglish: "Market confused hai — buyers aur sellers dono ka equal fight hua.",
    stock: "NIFTY 50 @ 19,250",
    wickTop: 40,
    bodyHeight: 4,
    wickBottom: 40,
  },
  {
    name: "Hammer",
    type: "bullish",
    description: "Small body at the top with a long lower wick. Found at the bottom of downtrends, it signals potential reversal.",
    psychology: "Sellers pushed price down aggressively, but buyers stepped in and pushed it back up — showing rejection of lower prices.",
    hinglish: "Sellers ne neeche push kiya, par buyers ne wapas upar le aaye. Bounce signal hai.",
    stock: "RELIANCE @ ₹2,400",
    wickTop: 8,
    bodyHeight: 24,
    wickBottom: 60,
    bodyPosition: "top",
  },
  {
    name: "Shooting Star",
    type: "bearish",
    description: "Small body at the bottom with a long upper wick. Found at the top of uptrends, it signals potential reversal.",
    psychology: "Buyers tried to push higher but sellers overwhelmed them. Price came back down near the open.",
    hinglish: "Buyers ne upar push kiya, par sellers ne rok diya. Reversal ka sign ho sakta hai.",
    stock: "TCS @ ₹3,850",
    wickTop: 60,
    bodyHeight: 24,
    wickBottom: 8,
    bodyPosition: "bottom",
  },
  {
    name: "Bullish Engulfing",
    type: "bullish",
    description: "A large green candle completely 'engulfs' the previous red candle. Strong bullish reversal signal.",
    psychology: "After a bearish day, buyers came in with massive force — overpowering all selling from the previous session.",
    hinglish: "Pichle din ke sellers ko aaj ke buyers ne poora kha liya. Strong buying signal.",
    stock: "HDFC BANK @ ₹1,580",
    wickTop: 12,
    bodyHeight: 60,
    wickBottom: 12,
  },
  {
    name: "Bearish Engulfing",
    type: "bearish",
    description: "A large red candle completely 'engulfs' the previous green candle. Strong bearish reversal signal.",
    psychology: "After a bullish day, sellers dominated with such force that they erased all gains and more.",
    hinglish: "Pichle din ki poori buying aaj ki selling ne kha li. Heavy selling pressure.",
    stock: "INFY @ ₹1,450",
    wickTop: 12,
    bodyHeight: 60,
    wickBottom: 12,
  },
  {
    name: "Morning Star",
    type: "bullish",
    description: "Three-candle pattern: bearish candle → small body (indecision) → bullish candle. Strong bottom reversal.",
    psychology: "Day 1: Sellers in control. Day 2: Neither side wins. Day 3: Buyers take over completely.",
    hinglish: "Pehle din selling, doosre din confusion, teesre din buying ne control le liya.",
    stock: "BANKNIFTY @ 43,200",
    wickTop: 10,
    bodyHeight: 40,
    wickBottom: 10,
  },
  {
    name: "Evening Star",
    type: "bearish",
    description: "Three-candle pattern: bullish candle → small body (indecision) → bearish candle. Strong top reversal.",
    psychology: "Day 1: Buyers in control. Day 2: Momentum fades. Day 3: Sellers overwhelm completely.",
    hinglish: "Pehle din buying, doosre din market ruka, teesre din selling aa gayi.",
    stock: "NIFTY @ 19,800",
    wickTop: 10,
    bodyHeight: 40,
    wickBottom: 10,
  },
];

export const CandlestickCard = ({ pattern, index }: { pattern: CandlestickData; index: number }) => {
  const [showHinglish, setShowHinglish] = useState(false);
  const isBull = pattern.type === "bullish";
  const isBear = pattern.type === "bearish";
  const color = isBull ? "bull" : isBear ? "bear" : "primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`chart-surface p-6 md:p-8 ${isBull ? 'glow-bull' : isBear ? 'glow-bear' : ''}`}
    >
      <div className="grid md:grid-cols-[200px_1fr] gap-8">
        {/* Candle Visual */}
        <div className="flex items-center justify-center">
          {pattern.name === "Morning Star" || pattern.name === "Evening Star" ? (
            <ThreeCandlePattern type={pattern.type} />
          ) : pattern.name === "Bullish Engulfing" || pattern.name === "Bearish Engulfing" ? (
            <EngulfingPattern type={pattern.type} />
          ) : (
            <SingleCandle pattern={pattern} color={color} />
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <h3 className="text-2xl font-bold">{pattern.name}</h3>
            <span className={`px-3 py-1 text-xs font-mono rounded-full border ${
              isBull ? 'bg-bull/10 text-bull border-bull/20' :
              isBear ? 'bg-bear/10 text-bear border-bear/20' :
              'bg-primary/10 text-primary border-primary/20'
            }`}>
              {pattern.type}
            </span>
            <span className="px-2 py-1 text-xs font-mono rounded bg-muted text-muted-foreground">
              {pattern.stock}
            </span>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            {pattern.description}
          </p>

          <div className="p-4 rounded-xl bg-muted/50 border border-border mb-3">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              Psychology
            </span>
            <p className="text-sm mt-2 leading-relaxed">
              {showHinglish && pattern.hinglish ? pattern.hinglish : pattern.psychology}
            </p>
          </div>

          {pattern.hinglish && (
            <button
              onClick={() => setShowHinglish(!showHinglish)}
              className="text-xs font-mono text-primary hover:text-primary/80 transition-colors press-effect"
            >
              {showHinglish ? "Show English" : "Show Hinglish"}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SingleCandle = ({ pattern, color }: { pattern: CandlestickData; color: string }) => (
  <div className="flex flex-col items-center">
    <div className="w-[2px] rounded-full bg-foreground/20" style={{ height: `${pattern.wickTop}px` }} />
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: pattern.bodyHeight }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`w-14 rounded-sm bg-${color}`}
    />
    <div className="w-[2px] rounded-full bg-foreground/20" style={{ height: `${pattern.wickBottom}px` }} />
  </div>
);

const EngulfingPattern = ({ type }: { type: string }) => {
  const isBull = type === "bullish";
  return (
    <div className="flex items-end gap-2">
      <div className="flex flex-col items-center">
        <div className="w-[2px] h-6 bg-foreground/20" />
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: 36 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={`w-10 rounded-sm ${isBull ? 'bg-bear' : 'bg-bull'}`}
        />
        <div className="w-[2px] h-6 bg-foreground/20" />
      </div>
      <div className="flex flex-col items-center">
        <div className="w-[2px] h-8 bg-foreground/20" />
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: 56 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`w-14 rounded-sm ${isBull ? 'bg-bull glow-bull' : 'bg-bear glow-bear'}`}
        />
        <div className="w-[2px] h-8 bg-foreground/20" />
      </div>
    </div>
  );
};

const ThreeCandlePattern = ({ type }: { type: string }) => {
  const isBull = type === "bullish";
  return (
    <div className="flex items-end gap-2">
      {/* Candle 1 */}
      <div className="flex flex-col items-center">
        <div className="w-[2px] h-5 bg-foreground/20" />
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={`w-10 rounded-sm ${isBull ? 'bg-bear' : 'bg-bull'}`}
        />
        <div className="w-[2px] h-5 bg-foreground/20" />
      </div>
      {/* Star */}
      <div className="flex flex-col items-center">
        <div className="w-[2px] h-12 bg-foreground/20" />
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: 8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="w-8 rounded-sm bg-muted-foreground"
        />
        <div className="w-[2px] h-12 bg-foreground/20" />
      </div>
      {/* Candle 3 */}
      <div className="flex flex-col items-center">
        <div className="w-[2px] h-5 bg-foreground/20" />
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className={`w-10 rounded-sm ${isBull ? 'bg-bull glow-bull' : 'bg-bear glow-bear'}`}
        />
        <div className="w-[2px] h-5 bg-foreground/20" />
      </div>
    </div>
  );
};
