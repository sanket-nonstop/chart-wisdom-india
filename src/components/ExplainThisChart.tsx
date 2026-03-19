import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChartScenario {
  title: string;
  stock: string;
  timeframe: string;
  pattern: string;
  bias: "bullish" | "bearish" | "neutral";
  explanation: string;
  hinglish: string;
  candles: { body: number; wick: number; tail: number; bull: boolean }[];
}

const scenarios: ChartScenario[] = [
  {
    title: "What's happening here?",
    stock: "RELIANCE",
    timeframe: "1D",
    pattern: "Bullish Engulfing at Support",
    bias: "bullish",
    explanation:
      "Price tested a support zone and formed a Bullish Engulfing pattern. The green candle completely covers the previous red candle, signaling strong buyer interest. This often leads to a reversal or bounce.",
    hinglish:
      "Support pe price ne Bullish Engulfing banaya — matlab buyers ne sellers ko completely dominate kar diya. Yahan se bounce ka chance hai!",
    candles: [
      { body: 35, wick: 8, tail: 6, bull: false },
      { body: 40, wick: 10, tail: 8, bull: false },
      { body: 30, wick: 6, tail: 5, bull: false },
      { body: 25, wick: 5, tail: 4, bull: false },
      { body: 20, wick: 4, tail: 12, bull: false },
      { body: 50, wick: 12, tail: 4, bull: true },
      { body: 35, wick: 8, tail: 5, bull: true },
      { body: 45, wick: 10, tail: 6, bull: true },
    ],
  },
  {
    title: "Can you spot the pattern?",
    stock: "NIFTY 50",
    timeframe: "1H",
    pattern: "Double Top Formation",
    bias: "bearish",
    explanation:
      "Price tested resistance twice at the same level and got rejected both times. This Double Top pattern suggests sellers are in control. A break below the neckline confirms the reversal.",
    hinglish:
      "Price do baar same resistance pe ruka — matlab sellers wahan bahut strong hain. Neckline tootne pe bearish move aa sakta hai.",
    candles: [
      { body: 30, wick: 6, tail: 5, bull: true },
      { body: 45, wick: 8, tail: 6, bull: true },
      { body: 55, wick: 15, tail: 4, bull: true },
      { body: 25, wick: 5, tail: 10, bull: false },
      { body: 30, wick: 6, tail: 8, bull: false },
      { body: 35, wick: 7, tail: 5, bull: true },
      { body: 50, wick: 16, tail: 4, bull: true },
      { body: 30, wick: 5, tail: 12, bull: false },
    ],
  },
  {
    title: "What should a trader think?",
    stock: "HDFC BANK",
    timeframe: "4H",
    pattern: "Morning Star Reversal",
    bias: "bullish",
    explanation:
      "After a downtrend, a big red candle was followed by a small indecision candle (Doji-like), then a big green candle. This 3-candle Morning Star pattern signals a trend reversal from bearish to bullish.",
    hinglish:
      "Downtrend ke baad Morning Star bana — pehle bada red, fir chhota indecision, fir bada green. Yeh pattern kehta hai ki ab bulls aa rahe hain!",
    candles: [
      { body: 40, wick: 8, tail: 5, bull: false },
      { body: 45, wick: 10, tail: 6, bull: false },
      { body: 55, wick: 12, tail: 8, bull: false },
      { body: 10, wick: 15, tail: 14, bull: true },
      { body: 50, wick: 6, tail: 4, bull: true },
      { body: 40, wick: 8, tail: 5, bull: true },
      { body: 35, wick: 6, tail: 5, bull: true },
      { body: 42, wick: 9, tail: 6, bull: true },
    ],
  },
];

export const ExplainThisChart = () => {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [showHinglish, setShowHinglish] = useState(false);

  const scenario = scenarios[scenarioIndex];

  const nextScenario = () => {
    setRevealed(false);
    setShowHinglish(false);
    setScenarioIndex((prev) => (prev + 1) % scenarios.length);
  };

  const BiasIcon = scenario.bias === "bullish" ? TrendingUp : TrendingDown;
  const biasColor = scenario.bias === "bullish" ? "text-bull" : "text-bear";
  const biasBg = scenario.bias === "bullish" ? "bg-bull/10" : "bg-bear/10";

  return (
    <section className="py-16 md:py-20 border-t border-border">
      <div className="container px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-4">
            <Eye className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">
              Practice Mode
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            Explain This <span className="text-primary">Chart</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Look at the chart, form your analysis, then reveal the answer. Train your chart-reading eye!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Chart card */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <p className="text-xs text-muted-foreground font-mono">
                  {scenario.stock} · {scenario.timeframe}
                </p>
                <p className="text-lg font-black">{scenario.title}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={nextScenario} className="rounded-full">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            {/* Chart */}
            <div className="px-5 py-6">
              <div className="flex items-end gap-2.5 h-36 mb-4">
                {scenario.candles.map((c, i) => (
                  <motion.div
                    key={`${scenarioIndex}-${i}`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" }}
                    style={{ originY: 1 }}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className="w-[2px] rounded-full"
                      style={{
                        height: `${c.wick}px`,
                        background: c.bull ? "hsl(var(--bull))" : "hsl(var(--bear))",
                        opacity: 0.5,
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
                      className="w-[2px] rounded-full"
                      style={{
                        height: `${c.tail}px`,
                        background: c.bull ? "hsl(var(--bull))" : "hsl(var(--bear))",
                        opacity: 0.5,
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Reveal button */}
              <Button
                onClick={() => setRevealed(!revealed)}
                variant={revealed ? "outline" : "default"}
                className="w-full mt-2"
              >
                {revealed ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" /> Hide Explanation
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" /> Reveal Pattern & Explanation
                  </>
                )}
              </Button>
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${biasBg}`}>
                        <BiasIcon className={`h-3.5 w-3.5 ${biasColor}`} />
                        <span className={`text-xs font-bold ${biasColor}`}>
                          {scenario.bias.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-bold">{scenario.pattern}</span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {showHinglish ? scenario.hinglish : scenario.explanation}
                    </p>

                    <button
                      onClick={() => setShowHinglish(!showHinglish)}
                      className="text-xs text-primary hover:underline"
                    >
                      {showHinglish ? "Show in English" : "🇮🇳 Show in Hinglish"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
