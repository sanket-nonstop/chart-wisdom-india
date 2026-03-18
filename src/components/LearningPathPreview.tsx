import { motion } from "framer-motion";
import { BookOpen, BarChart3, TrendingUp, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
  {
    icon: BookOpen,
    title: "Candlestick Basics",
    description: "Learn Doji, Hammer, Engulfing and more with real NIFTY examples.",
    level: "Beginner",
    to: "/candlesticks",
    lessons: 8,
  },
  {
    icon: BarChart3,
    title: "Chart Patterns",
    description: "Head & Shoulders, Double Top, Triangles — visually explained.",
    level: "Beginner",
    to: "/chart-patterns",
    lessons: 10,
  },
  {
    icon: TrendingUp,
    title: "Price Action",
    description: "Support, Resistance, Breakouts, Pullbacks — the core concepts.",
    level: "Intermediate",
    to: "/price-action",
    lessons: 7,
  },
  {
    icon: Eye,
    title: "Live Chart Lab",
    description: "Observe real NIFTY & BANKNIFTY charts with educational overlays.",
    level: "Practice",
    to: "/live-charts",
    lessons: 5,
  },
];

export const LearningPathPreview = () => {
  return (
    <section className="py-20">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Your Learning Path
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            From zero to reading charts like a pro. Each module builds on the last.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={mod.to}
                className="block chart-surface p-6 h-full hover:border-primary/30 transition-colors press-effect group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <mod.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {mod.level}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{mod.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {mod.description}
                </p>
                <span className="text-xs font-mono text-muted-foreground">
                  {mod.lessons} lessons
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
