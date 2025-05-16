
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
import JobsListingPage from "./pages/JobsListingPage";
// Career pages
import AiMlEngineerPage from "./pages/career/AiMlEngineerPage";
import CybersecurityExpertPage from "./pages/career/CybersecurityExpertPage";
import CloudDevOpsPage from "./pages/career/CloudDevOpsPage";
import ProductManagerAiPage from "./pages/career/ProductManagerAiPage";
import ProductManagerSaasPage from "./pages/career/ProductManagerSaasPage";
import FullStackDeveloperPage from "./pages/career/FullStackDeveloperPage";
import FrontEndDeveloperPage from "./pages/career/FrontEndDeveloperPage";
import BackendDeveloperPage from "./pages/career/BackendDeveloperPage";
import SolutionsArchitectPage from "./pages/career/SolutionsArchitectPage";
import UiUxDesignerPage from "./pages/career/UiUxDesignerPage";
import GraphicDesignerPage from "./pages/career/GraphicDesignerPage";
import VideoEditorPage from "./pages/career/VideoEditorPage";

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
            <Route path="/careers" element={<JobsListingPage />} />
            
            {/* Career Position Pages */}
            <Route path="/career/ai-ml-engineer" element={<AiMlEngineerPage />} />
            <Route path="/career/cybersecurity-expert" element={<CybersecurityExpertPage />} />
            <Route path="/career/cloud-devops-architect" element={<CloudDevOpsPage />} />
            <Route path="/career/product-manager-ai" element={<ProductManagerAiPage />} />
            <Route path="/career/product-manager-saas" element={<ProductManagerSaasPage />} />
            <Route path="/career/full-stack-developer" element={<FullStackDeveloperPage />} />
            <Route path="/career/front-end-developer" element={<FrontEndDeveloperPage />} />
            <Route path="/career/backend-developer" element={<BackendDeveloperPage />} />
            <Route path="/career/solutions-architect" element={<SolutionsArchitectPage />} />
            <Route path="/career/ui-ux-designer" element={<UiUxDesignerPage />} />
            <Route path="/career/graphic-designer" element={<GraphicDesignerPage />} />
            <Route path="/career/video-editor" element={<VideoEditorPage />} />
            
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
