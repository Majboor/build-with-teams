
import React from "react";
import { CareerLayout } from "@/components/career/CareerLayout";

export default function FullStackDeveloperPage() {
  const role = "Full Stack Developer (Senior)";

  return (
    <CareerLayout title="Join Our Team" role={role}>
      <h2>What is TaaS?</h2>
      <p>
        Build any app with AI and vetted teams. TaaS is building the future of remote dev collaboration.
      </p>

      <p className="text-muted-foreground mt-2 mb-6">
        <strong>Note:</strong> This is a waitlist position. Assignments depend on project availability.
      </p>

      <h3>Requirements:</h3>
      <ul>
        <li>4+ years full stack experience with React + Node or Django + Vue</li>
        <li>Ability to lead technical discussions and structure repos</li>
      </ul>

      <h3>Responsibilities:</h3>
      <ul>
        <li>Build and maintain full-stack client solutions</li>
        <li>Integrate APIs, databases, and cloud functions</li>
        <li>Collaborate with PMs and QA for quality builds</li>
      </ul>
    </CareerLayout>
  );
}
