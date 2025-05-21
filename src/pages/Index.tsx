import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
// Remove the duplicate useState import
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BetaSignupDialog } from "@/components/BetaSignupDialog";
import { AppDetailsDialog } from "@/components/AppDetailsDialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { WorkflowSection } from "@/components/WorkflowSection";
import { Link } from "react-router-dom";

type CrmFeature = {
  title: string;
  tooltip: string;
  content: React.ReactNode;
};

const crmFeatures: CrmFeature[] = [
  {
    title: "Absurdly simple to setup",
    tooltip: "Start with a template, edit like a spreadsheet, and customize what you want to track. With folk, getting started is fast!",
    content: (
      <div className="space-y-2">
        <div className="p-4 bg-gray-50 rounded-lg w-fit">
          <div className="flex items-center gap-2 p-2 border rounded-md bg-white">
            <Check className="h-4 w-4" />
            <span className="font-medium">Sales</span>
          </div>
          <div className="flex items-center gap-2 p-2 mt-2 border rounded-md bg-white opacity-50">
            <span className="font-medium">Partnerships</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "A single source of truth",
    tooltip: "Connect and sync all your favorite tools to keep your data consistent across your entire stack",
    content: (
      <div className="grid grid-cols-4 gap-2">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="aspect-square border rounded-md p-1 flex items-center justify-center bg-gray-50">
            {i < 11 && <div className="w-6 h-6 bg-gray-200 rounded" />}
            {i === 11 && <span className="text-sm text-gray-500">+99</span>}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Built for team-selling",
    tooltip: "Collaborate seamlessly with your team through customizable roles and permissions",
    content: (
      <div className="relative">
        <div className="w-full h-32 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="flex gap-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Admin</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Editor</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Viewer</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Surprisingly proactive",
    tooltip: "Smart reminders and notifications keep you on top of your follow-ups and tasks",
    content: (
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 p-3 border rounded-md bg-white">
          <div className="w-5 h-5 bg-gray-200 rounded" />
          <span className="font-medium">Follow-up with Walt</span>
        </div>
      </div>
    ),
  },
];

const builtProjects = [
  {
    title: "AI Interior Designing",
    description: "Transform spaces with AI-powered interior design solutions. Create stunning interior designs with the help of artificial intelligence.",
    image: "https://i.ibb.co/23gCWK1z/Screenshot-2025-04-27-at-2-38-50-AM.png",
    link: "https://interior.techrealm.pk"
  },
  {
    title: "AI Meals & Nutrition App",
    description: "Personalized meal plans and nutrition tracking using AI. Get customized meal recommendations and track your nutrition goals effortlessly.",
    image: "https://i.ibb.co/qLFnQpRv/Screenshot-2025-04-27-at-2-39-21-AM.png",
    link: "https://meals.techrealm.pk/"
  },
  {
    title: "AI 3D Model Creator",
    description: "Create stunning 3D models with AI assistance. Transform your ideas into professional 3D models with our innovative AI technology.",
    image: "https://i.ibb.co/kb5HxFc/Screenshot-2025-04-27-at-2-40-43-AM.png",
    link: "https://3dmodel.techrealm.pk/"
  },
  {
    title: "AI Fashion Design",
    description: "Design trendy fashion pieces with AI technology. Create unique and stylish fashion designs with the power of artificial intelligence.",
    image: "https://i.ibb.co/qFgT88Kx/Screenshot-2025-04-27-at-2-41-14-AM.png",
    link: "https://fashion.techrealm.pk/"
  },
  {
    title: "AI Document Creator",
    description: "Generate professional documents using AI. Create polished documents quickly and efficiently with AI-powered assistance.",
    image: "https://i.ibb.co/Pz9dqSsP/Screenshot-2025-04-27-at-2-41-50-AM.png",
    link: "https://documents.techrealm.pk/"
  },
  {
    title: "AI Presentation Creator",
    description: "Create engaging presentations with AI assistance. Build impressive presentations effortlessly using our AI-powered tools.",
    image: "https://i.ibb.co/5hSZZbhW/Screenshot-2025-04-27-at-2-42-19-AM.png",
    link: "https://presentations.techrealm.pk/"
  }
];

const features = [
  {
    title: "Workspace Overview",
    description: "TaaS's unified workspace combines AI-driven planning, real-time team collaboration, and end-to-end project tracking. From your initial prompt through deployment, every step—mockups, timelines, cost estimates, and live updates—is managed in one intuitive interface.",
    image: "https://i.ibb.co/tMdpVPWK/FB199-AD2-7-E30-4-A94-83-D7-911-C2-ACC2106-export.png"
  },
  {
    title: "Task Management",
    description: "Leverage AI to automatically assign, prioritize, and balance tasks across your team. Drag-and-drop cards or let the system reallocate work based on skills and availability—ensuring nothing falls through the cracks.",
    image: "https://i.ibb.co/FkqRv7Tj/5501317-E-FAF0-4663-9067-931-FB861-C83-C-export.png"
  },
  {
    title: "Calendar Integration",
    description: "Our smart calendar syncs milestones, deadlines, and on-demand meetings with your team and AI PM Assistant. Automated reminders and scheduling suggestions keep everyone aligned and on schedule.",
    image: "https://i.ibb.co/m5K3DDYJ/2400-C394-8946-4-E73-9-BF5-0-A2-E449-C336-D-export.png"
  },
  {
    title: "Quick Actions & Notifications",
    description: "Stay in control with contextual quick-action buttons—approve mockups, request changes, or launch sprints in a single click. Real-time alerts notify you of completed tasks, meeting invites, and critical updates.",
    image: "https://i.ibb.co/6cnKgRyr/B619-A99-C-3005-47-E7-B71-E-5-C36-ECFE1-F4-D-export.png"
  },
  {
    title: "Hire a Developer",
    description: "Spot top talent within your project's workspace and bring them on board instantly. Click to view a developer's profile, see their rate for your project, hire them for this build—or engage them for future work—all in one place.",
    image: "https://i.ibb.co/VrWt8Bt/86-F5-D48-D-AD4-D-4-F38-BB84-DE178-F2755-D2-export.png"
  },
  {
    title: "Task Details",
    description: "Click any task to reveal AI-generated specs, design notes, code snippets, and a full activity log. Edit requirements on the fly, leave feedback, and watch the AI update assignments and timelines accordingly.",
    image: "https://i.ibb.co/DHZZVMQ7/C6-B53-D20-E004-4-DF7-9230-DC2-D4-DA3-E76-B-export.png"
  }
];

const steps = [
  {
    title: "Submit Your Idea",
    description: "Share your vision and requirements",
  },
  {
    title: "Select Template",
    description: "Choose from our pre-built solutions",
  },
  {
    title: "Build Your App",
    description: "Watch your idea come to life",
  },
  {
    title: "Market Your App",
    description: "Use our AI-Marketing services",
    link: "/ai-marketing"
  },
];

const plans = [
  {
    name: "Starter",
    price: "$99",
    features: ["Basic AI assistance", "3 team members", "5 pages", "Basic support"],
  },
  {
    name: "Pro",
    price: "$199",
    features: ["Advanced AI tools", "5 team members", "10 pages", "Priority support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Full AI suite", "Unlimited team", "Unlimited pages", "24/7 support"],
  },
];

export function CrmFeatures() {
  return (
    <section className="container py-20">
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-16">
        Finally, an AI that works <span className="text-primary">for you</span>
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {crmFeatures.map((feature, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="space-y-4 p-6 border rounded-lg cursor-help transition-all hover:shadow-lg">
                  {feature.content}
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-[200px] text-center">
                <p>{feature.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </section>
  );
}

export default function Index() {
  const [showBetaDialog, setShowBetaDialog] = useState(false);
  const [showAllIndustries, setShowAllIndustries] = useState(false);
  const [appIdea, setAppIdea] = useState("");
  const [selectedApp, setSelectedApp] = useState<typeof builtProjects[0] | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [prompt, setPrompt] = useState("");
  const isMobile = useIsMobile();

  React.useEffect(() => {
    let loadedCount = 0;
    const totalImages = builtProjects.length + features.length;

    const preloadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          setLoadingProgress((loadedCount / totalImages) * 100);
          resolve(true);
        };
        img.onerror = reject;
      });
    };

    const loadAllImages = async () => {
      try {
        const projectImages = builtProjects.map(project => preloadImage(project.image));
        const featureImages = features.map(feature => preloadImage(feature.image));
        await Promise.all([...projectImages, ...featureImages]);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
        setImagesLoaded(true); // Show content even if some images fail to load
      }
    };

    loadAllImages();
  }, []);

  // Store the user's prompt in localStorage when it changes
  React.useEffect(() => {
    if (prompt) {
      localStorage.setItem("userPrompt", prompt);
    }
  }, [prompt]);

  const handleStartBuild = () => {
    if (prompt.trim()) {
      setShowBetaDialog(true);
    }
  };

  if (!imagesLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-4">
          <Progress value={loadingProgress} className="w-full" />
          <p className="text-center text-muted-foreground">Loading content... {Math.round(loadingProgress)}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col px-6 pt-20">
        <div className="container flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 py-8">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-normal leading-none">
                TaaS
              </h1>
              <div className="space-y-2">
                <p className="text-2xl sm:text-3xl lg:text-[40px] font-normal leading-tight">
                  Team as a Service
                </p>
              </div>
            </div>
            
            <p className="text-lg sm:text-xl font-normal max-w-md mx-auto lg:mx-0">
              On-demand team solutions to scale your business.
            </p>

            {/* Prompt Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Enter your idea or prompt..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="h-12 sm:h-14 text-lg"
              />
              <Button 
                onClick={handleStartBuild}
                className="h-12 sm:h-14 text-lg rounded-full bg-black text-white hover:bg-black/90 flex items-center justify-center"
                size="lg"
              >
                Try for free
              </Button>
            </div>

            {/* Show image on mobile between title and buttons */}
            <div className="lg:hidden w-full max-w-md mx-auto">
              <img 
                src="https://cdn.prod.website-files.com/626be00c396339c5a816353b/676ab103bbd3ff402b1c65a3_hero.webp"
                alt="TaaS product interface"
                className="w-full rounded-lg shadow-xl"
              />
            </div>

            <div className="flex justify-center lg:justify-start">
              <Button 
                variant="outline" 
                onClick={() => setShowBetaDialog(true)}
                className="h-12 sm:h-14 text-lg rounded-full border-2 flex items-center justify-center"
                size="lg"
              >
                Get a demo
              </Button>
            </div>
          </div>

          <div className="flex-1 hidden lg:block">
            <img 
              src="https://cdn.prod.website-files.com/626be00c396339c5a816353b/676ab103bbd3ff402b1c65a3_hero.webp"
              alt="TaaS product interface"
              className="w-full max-w-xl mx-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      <CrmFeatures />

      {/* Workflow Section */}
      <WorkflowSection />

      {/* What TaaS Has Built Section */}
      <section className="container py-20 border-t">
        <h2 className="text-3xl font-bold text-center mb-12">
          What TaaS Has Built
        </h2>
        {isMobile ? (
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {builtProjects.map((project, index) => (
                <CarouselItem key={index}>
                  <Card 
                    className="overflow-hidden cursor-pointer"
                    onClick={() => setSelectedApp(project)}
                  >
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground">{project.description}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {builtProjects.map((project, index) => (
              <Card 
                key={index} 
                className="overflow-hidden transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                onClick={() => setSelectedApp(project)}
              >
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="space-y-16">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
                <div className="flex-1">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="container py-20 border-t" id="industries">
        <h2 className="text-3xl font-bold text-center mb-12">Industries We Serve</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {(showAllIndustries ? industries : industries.slice(0, 4)).map((industry, i) => (
            <div 
              key={i} 
              className="glass p-6 space-y-4 animate-slide-up rounded-lg hover:shadow-lg transition-all"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="text-4xl">{industry.icon}</div>
              <h3 className="text-xl font-semibold">{industry.title}</h3>
              <p className="text-muted-foreground text-sm">{industry.description}</p>
            </div>
          ))}
        </div>
        
        {industries.length > 4 && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAllIndustries(!showAllIndustries)}
              className="rounded-full"
            >
              {showAllIndustries ? 'Show Less' : 'View More Industries'}
            </Button>
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="container py-20 border-t" id="features">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="glass p-6 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground mb-2">{step.description}</p>
              {step.link && (
                <Link to={step.link} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Learn more →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features - Changed to What Others Can't Do */}
      <section className="container py-20 border-t">
        <h2 className="text-3xl font-bold text-center mb-12">What Others Can't Do</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 animate-slide-up" style={{ animationDelay: "0ms" }}>
            <Check className="h-5 w-5 text-primary" />
            <span>Instant AI + Human Team</span>
          </div>
          <div className="flex items-center gap-2 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <Check className="h-5 w-5 text-primary" />
            <span>End-to-End in One Workspace</span>
          </div>
          <div className="flex items-center gap-2 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Check className="h-5 w-5 text-primary" />
            <span>On-Demand Expert Meetings</span>
          </div>
          <div className="flex items-center gap-2 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <Check className="h-5 w-5 text-primary" />
            <span>Hire Developers Permanently</span>
          </div>
          <div className="flex items-center gap-2 animate-slide-up" style={{ animationDelay: "400ms" }}>
            <Check className="h-5 w-5 text-primary" />
            <span>Seamless Hosting & Bundling</span>
          </div>
          <div className="flex items-center gap-2 animate-slide-up" style={{ animationDelay: "500ms" }}>
            <Check className="h-5 w-5 text-primary" />
            <span>Continuous AI-Driven Optimization</span>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container py-20 border-t" id="pricing">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className="glass p-6 space-y-4 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <div className="text-3xl font-bold">{plan.price}</div>
              <ul className="space-y-2">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full">Choose {plan.name}</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 mt-20">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 TaaS - Team as a Service. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/ai-marketing" className="hover:text-primary">AI Marketing</Link>
              <Link to="/careers" className="hover:text-primary">Careers</Link>
              <Link to="/about" className="hover:text-primary">About</Link>
              <a href="#" className="hover:text-primary">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      <BetaSignupDialog 
        open={showBetaDialog} 
        onOpenChange={setShowBetaDialog}
      />

      <AppDetailsDialog
        open={!!selectedApp}
        onOpenChange={(open) => !open && setSelectedApp(null)}
        app={selectedApp}
      />
    </div>
  );
}

const industries = [
  {
    title: "Retail Software Solutions",
    description: "Aalpha India, we deliver cutting edge technology solutions for online commerce industry. Our ecommerce solutions are built on latest technology",
    icon: "🛒"
  },
  {
    title: "ISVs and Product Development Solutions",
    description: "Aalpha India, we create winning business models through innovative product development practices. Committed to delivering the right value",
    icon: "💻"
  },
  {
    title: "Sports Software Development Company",
    description: "In the present era of digitalization, technology drives almost all the domains. The area of sports & entertainment is getting great attention",
    icon: "⚽"
  },
  {
    title: "Agri Tech",
    description: "We are a one-stop solution for Agritech Software Services. We develop custom Agritech Web and Mobile apps for clients worldwide.",
    icon: "🚜"
  },
  {
    title: "Education",
    description: "Boundless connectivity with the help of internet penetration, development of ICT devices, better access, convenience and flexibility to learners is shaping the future of this industry.",
    icon: "📚"
  },
  {
    title: "Fintech App Development Company",
    description: "Making quick yet careful decisions and managing large scale of operations with help of limited resources is the area of focus at the moment.",
    icon: "💰"
  },
  {
    title: "Food and Beverage",
    description: "The food and beverage industry needs advanced software and tools for its efficient management, delivery, manufacturing process, safe use",
    icon: "🍽️"
  },
  {
    title: "Healthcare",
    description: "We provide expert healthcare Healthcare Software Development services/solutions based on in-depth research and deep industry knowledge",
    icon: "❤️"
  },
  {
    title: "Hospitality & Travel",
    description: "The hospitality and travel software development industry is largely customer driven. Increasing customer demand for convenience and luxury is shaping the future dynamics of this industry.",
    icon: "✈️"
  },
  {
    title: "Government",
    description: "Empowering governments with AI-driven data solutions to enhance public services, streamline processes, and improve decision-making.",
    icon: "🏛️"
  },
  {
    title: "Pharma",
    description: "Enabling pharmaceutical innovation with AI and data platforms, accelerating drug discovery, compliance, and personalized medicine.",
    icon: "💊"
  },
  {
    title: "Logistics",
    description: "Optimizing supply chains with AI and data, improving efficiency, reducing costs, and ensuring timely delivery in logistics.",
    icon: "📦"
  },
  {
    title: "Telco",
    description: "Transforming telco operations with AI solutions, enhancing customer service, optimizing networks, and driving new service innovation.",
    icon: "📱"
  },
  {
    title: "Banking",
    description: "Revolutionizing banking with secure AI-driven solutions, enhancing customer interactions, risk management, and operational efficiency.",
    icon: "🏦"
  },
  {
    title: "FMCG",
    description: "Boosting FMCG success with AI, optimizing supply chains, analyzing consumer behaviour, and accelerating product development.",
    icon: "🛍️"
  },
  {
    title: "Industrial",
    description: "Enhancing industrial operations with AI, optimizing processes, reducing downtime, and improving product quality and compliance.",
    icon: "🏭"
  },
  {
    title: "Utilities",
    description: "Powering utilities with AI solutions, optimizing grid management, improving customer service, and ensuring regulatory compliance.",
    icon: "⚡"
  }
];
