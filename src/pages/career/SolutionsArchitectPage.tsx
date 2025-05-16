
import React from "react";
import { CareerLayout } from "@/components/career/CareerLayout";

export default function SolutionsArchitectPage() {
  const role = "Solutions Architect (Client-Facing / SaaS)";

  return (
    <CareerLayout title="Join Our Team" role={role}>
      <h2>What is TaaS?</h2>
      <p>
        A smarter way to build software — AI handles the busywork, experts handle the logic.
      </p>

      <p className="text-muted-foreground mt-2 mb-6">
        <strong>Note:</strong> Role activation depends on project demand.
      </p>

      <h3>Requirements:</h3>
      <ul>
        <li>5+ years in client delivery or technical architecture</li>
        <li>Strong communication and software planning skills</li>
      </ul>

      <h3>Responsibilities:</h3>
      <ul>
        <li>Interface with clients to translate needs into architecture plans</li>
        <li>Guide development team implementation</li>
      </ul>
    </CareerLayout>
  );
}
