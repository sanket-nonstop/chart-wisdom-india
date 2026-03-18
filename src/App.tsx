import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Candlesticks from "./pages/Candlesticks.tsx";
import ChartPatterns from "./pages/ChartPatterns.tsx";
import PriceAction from "./pages/PriceAction.tsx";
import LiveCharts from "./pages/LiveCharts.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/candlesticks" element={<Candlesticks />} />
          <Route path="/chart-patterns" element={<ChartPatterns />} />
          <Route path="/price-action" element={<PriceAction />} />
          <Route path="/live-charts" element={<LiveCharts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
