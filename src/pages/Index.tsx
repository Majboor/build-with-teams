import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/navigation";
import { ArrowRight, Check } from "lucide-react";

const features = [
  "AI-powered development",
  "Real-time collaboration", 
  "Expert team matching",
  "24/7 support",
  "Scalable infrastructure",
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
            />
            <Button className="w-full sm:w-auto">
              Start Your Build
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
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
              <span>{feature}</span>
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
