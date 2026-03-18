import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";

interface Concept {
  title: string;
  description: string;
  points: string[];
  hinglish?: string;
}

const concepts: Concept[] = [
  {
    title: "Support & Resistance",
    description: "Support is a price level where buying interest is strong enough to prevent further decline. Resistance is where selling prevents further rise.",
    points: [
      "Support = floor where price bounces up",
      "Resistance = ceiling where price gets rejected",
      "The more times a level is tested, the stronger it becomes",
      "When support breaks, it often becomes resistance (and vice versa)",
    ],
    hinglish: "Support woh level hai jahan se price aksar bounce karta hai. Resistance woh jahan se price neeche aata hai. Jab support tootey toh woh resistance ban jaata hai.",
  },
  {
    title: "Trend Identification",
    description: "A trend is the general direction of price movement. Identifying it early is the foundation of price action trading.",
    points: [
      "Uptrend: Higher highs + Higher lows — buyers in control",
      "Downtrend: Lower highs + Lower lows — sellers in control",
      "Sideways: Price moves between support and resistance — no clear direction",
      "Always trade (or study) in the direction of the trend",
    ],
    hinglish: "Uptrend mein price upar utha rehta hai — har low pichle se ooncha hota hai. Downtrend mein price gir raha hota hai. Sideways mein koi clear direction nahi hoti.",
  },
  {
    title: "Breakouts",
    description: "A breakout occurs when price moves decisively above resistance or below support, often accompanied by high volume.",
    points: [
      "Price consolidates near a key level",
      "A strong candle closes beyond the level — this is the breakout",
      "Volume confirmation makes breakouts more reliable",
      "Failed breakouts (fakeouts) trap traders on the wrong side",
    ],
    hinglish: "Jab price kisi important level ko todke upar ya neeche jaata hai — usey breakout kehte hain. Agar jhootha breakout ho toh usey fakeout kehte hain.",
  },
  {
    title: "Pullbacks",
    description: "After a breakout or strong move, price often comes back to 'test' the broken level before continuing. This retest is called a pullback.",
    points: [
      "Price breaks a level and moves away",
      "Then it comes back to test the broken level",
      "If the level holds, the move continues — this is a healthy pullback",
      "Pullbacks offer lower-risk observation points",
    ],
    hinglish: "Breakout ke baad price wapas aake level test karta hai. Agar level hold kare toh move continue hota hai. Yeh natural hai — market 'breath' leta hai.",
  },
  {
    title: "Liquidity Zones",
    description: "Liquidity zones are price areas where a large number of orders (stop losses, pending orders) are clustered. Big players often push price to these zones.",
    points: [
      "Liquidity sits above recent highs and below recent lows",
      "Institutions need liquidity to fill large orders",
      "Price often 'sweeps' these zones before reversing",
      "Understanding this helps avoid getting stopped out",
    ],
    hinglish: "Bade players ko apne orders fill karne ke liye volume chahiye. Woh price ko wahan le jaate hain jahan bahut saare stop losses hote hain — phir market palat jaata hai.",
  },
];

const PriceAction = () => {
  const [showHinglish, setShowHinglish] = useState<Record<number, boolean>>({});

  const toggleHinglish = (i: number) => {
    setShowHinglish(prev => ({ ...prev, [i]: !prev[i] }));
  };

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
              Module 3 • Intermediate
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Price Action Concepts
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Understanding how price moves and why. These concepts are the
              building blocks of reading any chart.
            </p>
          </motion.div>

          <div className="space-y-6">
            {concepts.map((concept, i) => (
              <motion.div
                key={concept.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="chart-surface p-6 md:p-8"
              >
                <h3 className="text-2xl font-bold mb-3">{concept.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{concept.description}</p>

                <div className="space-y-2 mb-4">
                  {concept.points.map((point, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + j * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-sm leading-relaxed">{point}</p>
                    </motion.div>
                  ))}
                </div>

                {concept.hinglish && (
                  <>
                    <button
                      onClick={() => toggleHinglish(i)}
                      className="text-xs font-mono text-primary hover:text-primary/80 transition-colors press-effect"
                    >
                      {showHinglish[i] ? "Hide Hinglish" : "Show Hinglish"}
                    </button>
                    {showHinglish[i] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 p-4 rounded-xl bg-muted/50 border border-border"
                      >
                        <p className="text-sm leading-relaxed">{concept.hinglish}</p>
                      </motion.div>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PriceAction;
