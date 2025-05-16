
import React from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CareerLayoutProps {
  children: React.ReactNode;
  title: string;
  role: string;
}

export function CareerLayout({ children, title, role }: CareerLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="container py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 space-y-4">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-xl text-muted-foreground">{role}</p>
            
            <Button asChild size="lg" className="mt-4">
              <Link to="/career/apply" state={{ jobTitle: role }}>Apply Now</Link>
            </Button>
          </div>
          
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
          
          <div className="mt-12 space-y-8">
            <h2 className="text-3xl font-bold">Ready to join our team?</h2>
            <p className="text-lg">
              We're looking for talented individuals who are passionate about technology and innovation. 
              If you think you're a good fit for this role, we'd love to hear from you!
            </p>
            <Button asChild size="lg">
              <Link to="/career/apply" state={{ jobTitle: role }}>Apply Now</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <footer className="border-t py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 TaaS - Team as a Service. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
