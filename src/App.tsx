import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Overview from "./pages/Overview";
import Kinship from "./pages/Kinship";
import Dialog from "./pages/Dialog";
import Ledger from "./pages/Ledger";
import Fortune from "./pages/Fortune";
import Email from "./pages/Email";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/kinship" element={<Kinship />} />
          <Route path="/dialog" element={<Dialog />} />
          <Route path="/ledger" element={<Ledger />} />
          <Route path="/fortune" element={<Fortune />} />
          <Route path="/email" element={<Email />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
