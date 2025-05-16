
import React from "react";
import { CareerLayout } from "@/components/career/CareerLayout";

export default function FrontEndDeveloperPage() {
  const role = "Front End Developer (React/Vue/Next.js)";

  return (
    <CareerLayout title="Join Our Team" role={role}>
      <h2>What is TaaS?</h2>
      <p>
        We bring software ideas to life through smart planning, vetted talent, and AI-based execution.
      </p>

      <p className="text-muted-foreground mt-2 mb-6">
        <strong>Note:</strong> This listing is for matching with future projects.
      </p>

      <h3>Requirements:</h3>
      <ul>
        <li>Proficiency in React.js, Vue.js, or Next.js</li>
        <li>Strong sense of UI/UX and responsiveness</li>
      </ul>

      <h3>Responsibilities:</h3>
      <ul>
        <li>Translate design mockups into functional components</li>
        <li>Optimize performance and cross-browser compatibility</li>
      </ul>
    </CareerLayout>
  );
}
