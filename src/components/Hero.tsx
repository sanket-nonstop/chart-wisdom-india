import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--chart-grid)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--chart-grid)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card mb-8"
        >
          <TrendingUp className="h-4 w-4 text-bull" />
          <span className="text-sm font-medium text-muted-foreground">
            Learn Indian Market Price Action
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6"
        >
          Stop guessing.
          <br />
          <span className="text-primary">Start reading.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Learn the visual language of the Indian Stock Market.
          <br className="hidden md:block" />
          No trading. Just understanding.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild size="lg" className="press-effect text-base px-8 py-6 glow-accent">
            <Link to="/candlesticks">
              Start Learning <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="press-effect text-base px-8 py-6">
            <Link to="/live-charts">
              Explore Live Charts
            </Link>
          </Button>
        </motion.div>

        {/* Mini candles decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex items-end justify-center gap-1"
        >
          {[40, 60, 35, 70, 50, 80, 45, 65, 55, 75, 42, 68, 58, 72, 48].map((h, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-[2px] bg-foreground/10" style={{ height: `${h * 0.3}px` }} />
              <div
                className={`w-2 rounded-sm ${i % 3 === 0 ? 'bg-bear/40' : 'bg-bull/40'}`}
                style={{ height: `${h}px` }}
              />
              <div className="w-[2px] bg-foreground/10" style={{ height: `${h * 0.4}px` }} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
