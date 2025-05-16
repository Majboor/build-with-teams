
import React from "react";
import { CareerLayout } from "@/components/career/CareerLayout";

export default function ProductManagerSaasPage() {
  const role = "Product Manager (General Tech / SaaS)";

  return (
    <CareerLayout title="Join Our Team" role={role}>
      <h2>What is TaaS?</h2>
      <p>
        TaaS combines real teams and AI to build client products end-to-end in a remote, 
        asynchronous workspace. Faster than freelancers, cheaper than agencies.
      </p>

      <p className="text-muted-foreground mt-2 mb-6">
        <strong>Note:</strong> This is a scouting listing. Immediate hiring is not guaranteed.
      </p>

      <h3>Requirements:</h3>
      <ul>
        <li>3+ years in product leadership roles for SaaS or digital platforms</li>
        <li>Experience with wireframes, user stories, and agile tools like Jira/ClickUp</li>
      </ul>

      <h3>Responsibilities:</h3>
      <ul>
        <li>Oversee full project lifecycles from planning to release</li>
        <li>Act as the bridge between client and build teams</li>
        <li>Monitor sprints, update stakeholders, and ensure timely delivery</li>
      </ul>
    </CareerLayout>
  );
}
