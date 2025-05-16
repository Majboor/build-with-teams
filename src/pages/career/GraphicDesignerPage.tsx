
import React from "react";
import { CareerLayout } from "@/components/career/CareerLayout";

export default function GraphicDesignerPage() {
  const role = "Graphic Designer (Branding/UI-heavy)";

  return (
    <CareerLayout title="Join Our Team" role={role}>
      <h2>What is TaaS?</h2>
      <p>
        We believe good design is what brings software to life. TaaS builds 
        world-class apps with a global designer network.
      </p>

      <p className="text-muted-foreground mt-2 mb-6">
        <strong>Note:</strong> This is a talent pool listing.
      </p>

      <h3>Requirements:</h3>
      <ul>
        <li>Branding and UI asset creation</li>
        <li>Proficiency in Adobe Suite/Figma</li>
      </ul>

      <h3>Responsibilities:</h3>
      <ul>
        <li>Deliver logos, banners, UI icons, and branding kits</li>
        <li>Work with PMs and clients on visual storytelling</li>
      </ul>
    </CareerLayout>
  );
}
