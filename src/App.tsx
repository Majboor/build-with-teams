
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PersonPage from "./pages/PersonPage";
import WorkspacePage from "./pages/WorkspacePage";
import ModalPage from "./pages/ModalPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="build-teams-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/person" element={<PersonPage />} />
            <Route path="/workspace" element={<WorkspacePage />} />
            <Route path="/modal" element={<ModalPage />} />
            <Route path="/task" element={<NotFound />} />
            <Route path="/calendar" element={<NotFound />} />
            <Route path="/dashboard" element={<NotFound />} />
            <Route path="/pricing" element={<NotFound />} />
            <Route path="/about" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
