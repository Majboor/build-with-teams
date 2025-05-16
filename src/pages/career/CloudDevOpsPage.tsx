
import React from "react";
import { CareerLayout } from "@/components/career/CareerLayout";

export default function CloudDevOpsPage() {
  const role = "Cloud / DevOps / Platform Architect";

  return (
    <CareerLayout title="Join Our Team" role={role}>
      <h2>What is TaaS?</h2>
      <p>
        TaaS enables clients to build and launch products fast by using a hybrid 
        of AI and a pre-vetted expert team.
      </p>

      <p className="text-muted-foreground mt-2 mb-6">
        <strong>Note:</strong> This is a talent onboarding listing; projects will be matched based on demand.
      </p>

      <h3>Requirements:</h3>
      <ul>
        <li>4+ years in DevOps, Platform Engineering, or Cloud Architecture</li>
        <li>Mastery in AWS/GCP/Azure + Infrastructure-as-Code (Terraform, Pulumi)</li>
        <li>CI/CD, observability, and microservices deployment skills</li>
      </ul>

      <h3>Responsibilities:</h3>
      <ul>
        <li>Architect scalable platforms for client apps</li>
        <li>Set up automated CI/CD pipelines</li>
        <li>Ensure observability and uptime monitoring</li>
        <li>Optimize cost, speed, and reliability</li>
      </ul>
    </CareerLayout>
  );
}
