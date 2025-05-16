
import React from "react";
import { CareerLayout } from "@/components/career/CareerLayout";

export default function AiMlEngineerPage() {
  const role = "AI/ML Engineer / LLM Engineer (Senior/Lead)";

  return (
    <CareerLayout title="Join Our Team" role={role}>
      <h2>What is TaaS?</h2>
      <p>
        TaaS (Team-as-a-Service) is an AI-powered platform that lets anyone build a real app 
        with a real team — for under $100. We instantly assign a pre-vetted team of 300+ 
        developers, designers, and PMs to projects using AI-based matching. You dream it. We build it.
      </p>

      <p className="text-muted-foreground mt-2 mb-6">
        <strong>Note:</strong> This is not an immediate hire position. Selected applicants 
        may be publicly featured and matched with client projects as demand arises.
      </p>

      <h3>Requirements:</h3>
      <ul>
        <li>3+ years in AI/ML or NLP with demonstrated work in LLMs or Transformer-based architectures</li>
        <li>Strong experience with Python, PyTorch/TensorFlow, and ML pipelines</li>
        <li>Understanding of model training, fine-tuning, and deployment on cloud infrastructure</li>
        <li>Published research or open-source contributions are a plus</li>
      </ul>

      <h3>Responsibilities:</h3>
      <ul>
        <li>Collaborate with cross-functional teams to build AI/LLM-based solutions</li>
        <li>Lead experimentation, training, and performance evaluation</li>
        <li>Integrate models into client applications</li>
        <li>Document workflows and results clearly for client demos</li>
      </ul>
    </CareerLayout>
  );
}
