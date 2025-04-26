import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/navigation";
import { ArrowRight, Check } from "lucide-react";
import { BetaSignupDialog } from "@/components/BetaSignupDialog";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Workspace Overview",
    description: "A comprehensive workspace that brings all your project management needs into one place.",
    image: "https://i.ibb.co/tMdpVPWK/FB199-AD2-7-E30-4-A94-83-D7-911-C2-ACC2106-export.png"
  },
  {
    title: "Task Management",
    description: "Efficiently organize and track tasks with our intuitive task management system.",
    image: "https://i.ibb.co/FkqRv7Tj/5501317-E-FAF0-4663-9067-931-FB861-C83-C-export.png"
  },
  {
    title: "Calendar Integration",
    description: "Stay on schedule with our powerful calendar integration feature.",
    image: "https://i.ibb.co/m5K3DDYJ/2400-C394-8946-4-E73-9-BF5-0-A2-E449-C336-D-export.png"
  },
  {
    title: "Quick Actions & Notifications",
    description: "Stay informed and take quick actions with our smart notification system.",
    image: "https://i.ibb.co/6cnKgRyr/B619-A99-C-3005-47-E7-B71-E-5-C36-ECFE1-F4-D-export.png"
  },
  {
    title: "Developer Dashboard",
    description: "A personalized space for developers to manage their tasks and progress.",
    image: "https://i.ibb.co/VrWt8Bt/86-F5-D48-D-AD4-D-4-F38-BB84-DE178-F2755-D2-export.png"
  },
  {
    title: "Task Details",
    description: "Dive deep into task details with our comprehensive task view.",
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

  const handleStartBuild = () => {
    if (appIdea.trim()) {
      setShowBetaDialog(true);
    }
  };

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

      {/* Beta Signup Dialog */}
      <BetaSignupDialog 
        open={showBetaDialog} 
        onOpenChange={setShowBetaDialog}
      />

      {/* Features Showcase */}
      <section className="container py-20 border-t">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features for Your Team
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden transform hover:scale-105 transition-transform duration-200">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-20 border-t" id="features">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="glass p-6 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
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
    </div>
  );
}
