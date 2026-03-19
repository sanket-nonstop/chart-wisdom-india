import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PatternOfTheDay } from "@/components/PatternOfTheDay";
import { LearningPathPreview } from "@/components/LearningPathPreview";
import { RevisionFlashcards } from "@/components/RevisionFlashcards";
import { ExplainThisChart } from "@/components/ExplainThisChart";
import { QuickQuiz } from "@/components/QuickQuiz";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Hero />
        <PatternOfTheDay />
        <LearningPathPreview />
        <RevisionFlashcards />
        <ExplainThisChart />
        <QuickQuiz />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
