import { BarChart3 } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border py-12 mt-20">
    <div className="container px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <span className="font-bold">ChartShala</span>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Educational platform for Indian market chart reading. No trading advice. Learn to observe, not to gamble.
        </p>
        <p className="text-xs text-muted-foreground">
          Market hours: 9:15 AM – 3:30 PM IST
        </p>
      </div>
    </div>
  </footer>
);
