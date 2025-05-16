
import React from "react";
import { CareerLayout } from "@/components/career/CareerLayout";

export default function UiUxDesignerPage() {
  const role = "UI/UX Designer (Product-focused)";

  return (
    <CareerLayout title="Join Our Team" role={role}>
      <h2>What is TaaS?</h2>
      <p>
        TaaS makes app creation accessible and fast through a hybrid of AI planning 
        and top-tier design/dev talent.
      </p>

      <p className="text-muted-foreground mt-2 mb-6">
        <strong>Note:</strong> This is not an active offer but a portfolio-based evaluation.
      </p>

      <h3>Requirements:</h3>
      <ul>
        <li>2+ years designing for SaaS/web apps</li>
        <li>Figma, Adobe XD, prototyping and responsiveness</li>
      </ul>

      <h3>Responsibilities:</h3>
      <ul>
        <li>Create product design flows and screens</li>
        <li>Collaborate with frontend developers</li>
      </ul>
    </CareerLayout>
  );
}
