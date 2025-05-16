
import React from "react";
import { CareerLayout } from "@/components/career/CareerLayout";

export default function BackendDeveloperPage() {
  const role = "Backend Developer (Node/Python/Go)";

  return (
    <CareerLayout title="Join Our Team" role={role}>
      <h2>What is TaaS?</h2>
      <p>
        TaaS connects talented developers to global projects with transparent 
        pricing and AI-managed workflows.
      </p>

      <p className="text-muted-foreground mt-2 mb-6">
        <strong>Note:</strong> This is a non-immediate position for future projects.
      </p>

      <h3>Requirements:</h3>
      <ul>
        <li>Strong backend skills in either Node.js, Python (Django/Flask), or Go</li>
        <li>REST API and database design expertise</li>
      </ul>

      <h3>Responsibilities:</h3>
      <ul>
        <li>Build scalable backend services</li>
        <li>Implement integrations and ensure security standards</li>
      </ul>
    </CareerLayout>
  );
}
