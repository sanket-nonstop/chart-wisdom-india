import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "A Hammer candle at the bottom of a downtrend suggests:",
    options: ["Sellers are still in control", "Potential bullish reversal", "Trend will continue down", "Nothing meaningful"],
    correct: 1,
    explanation: "The long lower wick of a Hammer shows buyers rejected lower prices. At the bottom of a downtrend, this signals potential reversal.",
  },
  {
    question: "In a Double Top pattern, what confirms the reversal?",
    options: ["Price touches resistance twice", "Volume increases at the top", "Price breaks below the neckline", "A Doji forms at the top"],
    correct: 2,
    explanation: "A Double Top is only confirmed when price breaks below the support/neckline between the two peaks.",
  },
  {
    question: "What does a Doji candle indicate?",
    options: ["Strong buying pressure", "Strong selling pressure", "Market indecision", "Trend continuation"],
    correct: 2,
    explanation: "A Doji has nearly equal open and close, showing neither buyers nor sellers won. It signals indecision.",
  },
  {
    question: "An Ascending Triangle usually breaks:",
    options: ["Downward", "Upward", "Sideways", "It's random"],
    correct: 1,
    explanation: "In an Ascending Triangle, buyers make higher lows while resistance stays flat. The increasing buying pressure usually leads to an upward breakout.",
  },
];

export const QuickQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = quizQuestions[currentQ];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentQ + 1 >= quizQuestions.length) {
      setFinished(true);
    } else {
      setCurrentQ(c => c + 1);
      setSelected(null);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <section className="py-20">
      <div className="container px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Quick Quiz</h2>
          <p className="text-muted-foreground">Test your pattern recognition skills</p>
        </div>

        <div className="chart-surface p-6 md:p-8">
          <AnimatePresence mode="wait">
            {finished ? (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="text-5xl font-bold mb-2">{score}/{quizQuestions.length}</div>
                <p className="text-muted-foreground mb-6">
                  {score === quizQuestions.length ? "Perfect! You're reading charts well." :
                   score >= 3 ? "Great job! Keep learning." : "Keep practicing — you'll get there!"}
                </p>
                <Button onClick={handleReset} variant="outline" className="press-effect">
                  <RotateCcw className="h-4 w-4 mr-2" /> Try Again
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-mono text-muted-foreground">
                    Question {currentQ + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-xs font-mono text-primary">Score: {score}</span>
                </div>

                <h3 className="text-lg font-semibold mb-6">{q.question}</h3>

                <div className="space-y-3 mb-6">
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={selected !== null}
                      className={`w-full text-left p-4 rounded-xl border transition-all press-effect text-sm ${
                        selected === null
                          ? "border-border hover:border-primary/30 bg-muted/30"
                          : i === q.correct
                          ? "border-bull/50 bg-bull/10"
                          : i === selected
                          ? "border-bear/50 bg-bear/10"
                          : "border-border bg-muted/20 opacity-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {selected !== null && i === q.correct && <CheckCircle2 className="h-4 w-4 text-bull flex-shrink-0" />}
                        {selected !== null && i === selected && i !== q.correct && <XCircle className="h-4 w-4 text-bear flex-shrink-0" />}
                        <span>{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {selected !== null && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="p-4 rounded-xl bg-muted/50 border border-border mb-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{q.explanation}</p>
                    </div>
                    <Button onClick={handleNext} className="w-full press-effect">
                      {currentQ + 1 >= quizQuestions.length ? "See Results" : "Next Question"}
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
