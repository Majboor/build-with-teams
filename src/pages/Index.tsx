import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/navigation";
import { ArrowRight, Check } from "lucide-react";
import { BetaSignupDialog } from "@/components/BetaSignupDialog";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AppDetailsDialog } from "@/components/AppDetailsDialog";
import React from "react";
import { Progress } from "@/components/ui/progress";

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
    description: "A comprehensive workspace that brings all your project management needs into one place. Streamline your workflow and boost productivity with our intuitive interface.",
    image: "https://i.ibb.co/tMdpVPWK/FB199-AD2-7-E30-4-A94-83-D7-911-C2-ACC2106-export.png"
  },
  {
    title: "Task Management",
    description: "Efficiently organize and track tasks with our intuitive task management system. Keep your team aligned and projects on schedule.",
    image: "https://i.ibb.co/FkqRv7Tj/5501317-E-FAF0-4663-9067-931-FB861-C83-C-export.png"
  },
  {
    title: "Calendar Integration",
    description: "Stay on schedule with our powerful calendar integration feature. Never miss a deadline or important meeting again.",
    image: "https://i.ibb.co/m5K3DDYJ/2400-C394-8946-4-E73-9-BF5-0-A2-E449-C336-D-export.png"
  },
  {
    title: "Quick Actions & Notifications",
    description: "Stay informed and take quick actions with our smart notification system. Keep your finger on the pulse of your projects.",
    image: "https://i.ibb.co/6cnKgRyr/B619-A99-C-3005-47-E7-B71-E-5-C36-ECFE1-F4-D-export.png"
  },
  {
    title: "Developer Dashboard",
    description: "A personalized space for developers to manage their tasks and track progress. Everything you need at your fingertips.",
    image: "https://i.ibb.co/VrWt8Bt/86-F5-D48-D-AD4-D-4-F38-BB84-DE178-F2755-D2-export.png"
  },
  {
    title: "Task Details",
    description: "Dive deep into task details with our comprehensive task view. Get all the information you need in one place.",
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

export default function Index() {
  const [showBetaDialog, setShowBetaDialog] = useState(false);
  const [appIdea, setAppIdea] = useState("");
  const [selectedApp, setSelectedApp] = useState<typeof builtProjects[0] | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

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

  const handleStartBuild = () => {
    if (appIdea.trim()) {
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
      <section className="container pt-32 pb-20">
        <div className="text-center space-y-6 max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Team as a Service: Powering Your Projects with AI
          </h1>
          <p className="text-lg text-muted-foreground">
            From concept to launch, we handle everything so you can focus on your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
            <Input 
              placeholder="What type of app do you want to build?"
              className="text-center sm:text-left"
              value={appIdea}
              onChange={(e) => setAppIdea(e.target.value)}
            />
            <Button onClick={handleStartBuild} className="w-full sm:w-auto">
              Start Your Build
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CRM Features Section */}
      <section className="container py-20">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-16">
          Finally, a CRM that works <span className="text-primary">for you</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 p-6 border rounded-lg">
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
            <h3 className="text-2xl font-semibold">Absurdly simple to setup</h3>
          </div>

          <div className="space-y-4 p-6 border rounded-lg">
            <div className="grid grid-cols-4 gap-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-square border rounded-md p-1 flex items-center justify-center bg-gray-50">
                  {i < 11 && <div className="w-6 h-6 bg-gray-200 rounded" />}
                  {i === 11 && <span className="text-sm text-gray-500">+99</span>}
                </div>
              ))}
            </div>
            <h3 className="text-2xl font-semibold">A single source of truth</h3>
          </div>

          <div className="space-y-4 p-6 border rounded-lg">
            <div className="relative">
              <div className="w-full h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="flex gap-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Admin</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Editor</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Viewer</span>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-semibold">Built for team-selling</h3>
          </div>

          <div className="space-y-4 p-6 border rounded-lg">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 p-3 border rounded-md bg-white">
                <div className="w-5 h-5 bg-gray-200 rounded" />
                <span className="font-medium">Follow-up with Walt</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold">Surprisingly proactive</h3>
          </div>
        </div>
      </section>

      {/* What TaaS Has Built Section */}
      <section className="container py-20 border-t">
        <h2 className="text-3xl font-bold text-center mb-12">
          What TaaS Has Built
        </h2>
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

      {/* How It Works */}
      <section className="container py-20 border-t" id="features">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="glass p-6 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container py-20 border-t">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <Check className="h-5 w-5 text-primary" />
              <span>{feature.title}</span>
            </div>
          ))}
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
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms of Service</a>
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
        app={selectedApp!}
      />
    </div>
  );
}
