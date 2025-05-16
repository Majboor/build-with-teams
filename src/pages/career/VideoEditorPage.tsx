
import React from "react";
import { CareerLayout } from "@/components/career/CareerLayout";

export default function VideoEditorPage() {
  const role = "Video Editor (Tech Ads, Content Creators)";

  return (
    <CareerLayout title="Join Our Team" role={role}>
      <h2>What is TaaS?</h2>
      <p>
        TaaS powers content-driven growth by producing software and assets 
        quickly for creators and startups.
      </p>

      <p className="text-muted-foreground mt-2 mb-6">
        <strong>Note:</strong> This listing is for project-based collaborations.
      </p>

      <h3>Requirements:</h3>
      <ul>
        <li>2+ years editing reels, explainer videos, or tech ads</li>
        <li>Adobe Premiere, After Effects, or similar</li>
      </ul>

      <h3>Responsibilities:</h3>
      <ul>
        <li>Edit engaging tech-focused videos</li>
        <li>Collaborate with marketing to produce conversion-driven content</li>
      </ul>
    </CareerLayout>
  );
}
