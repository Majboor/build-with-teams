
import React from "react";
import { Navigation } from "@/components/navigation";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jobListings } from "@/data/jobListings";

export default function JobsListingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="container py-12">
        <div className="max-w-5xl mx-auto mb-12 text-center space-y-4">
          <h1 className="text-4xl font-bold">Join Our Team</h1>
          <p className="text-xl text-muted-foreground">
            We're looking for talented individuals to help us build the future of software development.
            Explore our open positions below.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {jobListings.map((job) => (
            <Card key={job.id} className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>{job.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="list-disc pl-5 space-y-1">
                  {job.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/career/${job.slug}`}>View Position</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <footer className="border-t py-12 mt-auto">
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
