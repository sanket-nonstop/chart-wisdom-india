import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const flashcards = [
  {
    name: "Hammer",
    category: "Bullish Reversal",
    front: "Small body at top, long lower shadow (2x body). Appears at bottom of downtrend.",
    back: "Buyers pushed price up from lows — shows rejection of lower prices. Look for confirmation candle next day.",
    emoji: "🔨",
  },
  {
    name: "Shooting Star",
    category: "Bearish Reversal",
    front: "Small body at bottom, long upper shadow. Appears at top of uptrend.",
    back: "Sellers rejected higher prices. Strong signal when it appears near resistance. Wait for next red candle to confirm.",
    emoji: "⭐",
  },
  {
    name: "Bullish Engulfing",
    category: "Bullish Reversal",
    front: "Green candle completely covers previous red candle's body.",
    back: "Strong buying pressure overpowered sellers. Best near support zones. Higher volume = stronger signal.",
    emoji: "🟢",
  },
  {
    name: "Head & Shoulders",
    category: "Bearish Pattern",
    front: "Three peaks — middle one highest. Neckline connects the two troughs.",
    back: "Classic trend reversal. Enter short below neckline break. Target = height of head from neckline.",
    emoji: "👤",
  },
  {
    name: "Double Bottom",
    category: "Bullish Pattern",
    front: "Price tests same support level twice and bounces. Forms a 'W' shape.",
    back: "Strong reversal signal. Enter on break above the middle peak. Common in NIFTY at key support levels.",
    emoji: "📈",
  },
  {
    name: "Morning Star",
    category: "Bullish Reversal",
    front: "3-candle pattern: big red → small body (indecision) → big green.",
    back: "Shows sellers losing control. The small middle candle is key — a Doji here makes it even stronger.",
    emoji: "🌅",
  },
  {
    name: "Support & Resistance",
    category: "Price Action",
    front: "Horizontal levels where price repeatedly bounces (support) or gets rejected (resistance).",
    back: "The more times a level is tested, the weaker it becomes. When broken, support becomes resistance & vice versa.",
    emoji: "📊",
  },
  {
    name: "Flag Pattern",
    category: "Continuation",
    front: "Sharp move (pole) followed by a small rectangular consolidation against the trend.",
    back: "Breakout in the direction of the pole. Target = length of the pole added to breakout point.",
    emoji: "🚩",
  },
];

export const RevisionFlashcards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const card = flashcards[currentIndex];

  const navigate = (dir: number) => {
    setDirection(dir);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + dir + flashcards.length) % flashcards.length);
  };

  return (
    <section className="py-16 md:py-20">
      <div className="container px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-4">
            <Layers className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">
              Quick Revision
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            Flip & <span className="text-primary">Learn</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Tap the card to reveal the explanation. Swipe through all patterns for quick revision.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          {/* Card */}
          <div className="relative w-full max-w-md h-72" style={{ perspective: "1000px" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex + (isFlipped ? "-back" : "-front")}
                custom={direction}
                initial={{ opacity: 0, x: direction * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -80 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsFlipped(!isFlipped)}
                className="absolute inset-0 cursor-pointer"
              >
                <div className="h-full rounded-2xl border border-border bg-card p-6 flex flex-col justify-between overflow-hidden relative group">
                  {/* Glow */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-[50px]" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{card.emoji}</span>
                      <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-semibold">
                        {card.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-black mb-3">{card.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {isFlipped ? card.back : card.front}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground font-mono">
                      {isFlipped ? "Explanation" : "Pattern"}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-primary">
                      <RotateCcw className="h-3 w-3" />
                      Tap to {isFlipped ? "see front" : "reveal"}
                    </div>
                  </div>

                  {/* Side indicator */}
                  <div
                    className={`absolute top-0 left-0 w-1 h-full ${
                      isFlipped ? "bg-bull" : "bg-primary"
                    }`}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full h-10 w-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-mono text-muted-foreground">
              {currentIndex + 1} / {flashcards.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(1)}
              className="rounded-full h-10 w-10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
