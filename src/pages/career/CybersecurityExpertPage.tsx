
import React from "react";
import { CareerLayout } from "@/components/career/CareerLayout";

export default function CybersecurityExpertPage() {
  const role = "Cybersecurity Expert / InfoSec Officer";

  return (
    <CareerLayout title="Join Our Team" role={role}>
      <h2>What is TaaS?</h2>
      <p>
        TaaS is where vetted human talent and AI come together to build production-grade 
        apps at lightning speed. We work with early-stage startups and scale with demand.
      </p>

      <p className="text-muted-foreground mt-2 mb-6">
        <strong>Note:</strong> This is a pre-hiring listing. Immediate compensation is not guaranteed.
      </p>

      <h3>Requirements:</h3>
      <ul>
        <li>3+ years in cybersecurity, with hands-on experience in penetration testing and incident response</li>
        <li>Deep knowledge of OWASP, NIST, and ISO security frameworks</li>
        <li>Ability to advise teams on secure design and cloud hardening</li>
      </ul>

      <h3>Responsibilities:</h3>
      <ul>
        <li>Perform security assessments for client builds</li>
        <li>Develop and enforce security protocols</li>
        <li>Provide training and documentation for development teams</li>
        <li>Contribute to compliance strategies (GDPR, HIPAA, etc.)</li>
      </ul>
    </CareerLayout>
  );
}
