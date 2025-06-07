
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
import TaskPage from "./pages/TaskPage";
import CalendarPage from "./pages/CalendarPage";
import DashboardPage from "./pages/DashboardPage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";
import CareersTestPage from "./pages/CareersTestPage";
import PTestPage from "./pages/PTestPage";
import ApiTestPage from "./pages/ApiTestPage";
import CareerApplyPage from "./pages/CareerApplyPage";
import CareerSuccessPage from "./pages/CareerSuccessPage";
import CareersPage from "./pages/CareersPage";
import JobDetailPage from "./pages/JobDetailPage";
import AIMarketingPage from "./pages/AIMarketingPage";
import FashionCaseStudyPage from "./pages/FashionCaseStudyPage";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="build-teams-theme">
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/person" element={<PersonPage />} />
            <Route path="/workspace" element={<WorkspacePage />} />
            <Route path="/modal" element={<ModalPage />} />
            <Route path="/task" element={<TaskPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers/test" element={<CareersTestPage />} />
            <Route path="/ptest" element={<PTestPage />} />
            <Route path="/api-test" element={<ApiTestPage />} />
            <Route path="/career/apply" element={<CareerApplyPage />} />
            <Route path="/career/success" element={<CareerSuccessPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/careers/:jobId" element={<JobDetailPage />} />
            <Route path="/ai-marketing" element={<AIMarketingPage />} />
            <Route path="/fashion-case-study" element={<FashionCaseStudyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
