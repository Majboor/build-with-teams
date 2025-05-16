
import React from "react";
import { CareerLayout } from "@/components/career/CareerLayout";

export default function ProductManagerAiPage() {
  const role = "Product Manager (AI, Data, Scraping Tools)";

  return (
    <CareerLayout title="Join Our Team" role={role}>
      <h2>What is TaaS?</h2>
      <p>
        We are redefining software development by combining AI-driven product planning 
        with expert human execution, all in one collaborative workspace.
      </p>

      <p className="text-muted-foreground mt-2 mb-6">
        <strong>Note:</strong> This is not an immediate job placement. Your application may be used to match future opportunities.
      </p>

      <h3>Requirements:</h3>
      <ul>
        <li>3+ years of product management experience in data/AI tooling</li>
        <li>Technical understanding of web scraping, APIs, and data workflows</li>
        <li>Strong documentation and client-facing communication</li>
      </ul>

      <h3>Responsibilities:</h3>
      <ul>
        <li>Define product specs with founders and clients</li>
        <li>Coordinate developers, data engineers, and QA</li>
        <li>Ship MVPs and iterate using agile cycles</li>
        <li>Own client delivery and satisfaction</li>
      </ul>
    </CareerLayout>
  );
}
