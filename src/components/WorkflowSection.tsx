import React, { useRef, useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  FileEdit,
  Users,
  ArrowRight,
  CircleArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Initial Consultation",
    description:
      "We start with a comprehensive consultation to understand your business needs, goals, and current AI capabilities",
    icon: User,
  },
  {
    number: "2",
    title: "Tailored Proposal",
    description:
      "Based on our assessment, we provide a detailed proposal outlining the scope of work, timeline, and team composition",
    icon: FileEdit,
  },
  {
    number: "3",
    title: "Onboarding",
    description:
      "Once approved, we assemble your AI team and begin the onboarding process, integrating seamlessly with your existing workflows",
    icon: Users,
  },
  {
    number: "4",
    title: "Execution and Support",
    description:
      "Our team works closely with you to execute the project, providing regular updates and ongoing support to ensure success",
    icon: ArrowRight,
  },
  {
    number: "5",
    title: "Continuous Improvement",
    description:
      "Post-deployment, we offer continuous monitoring and optimization to ensure your AI solutions deliver maximum value",
    icon: CircleArrowRight,
  },
];

export function WorkflowSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<HTMLDivElement[]>([]);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [segments, setSegments] = useState<string[]>([]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    // Measure container dimensions
    const rect = containerRef.current.getBoundingClientRect();
    setDims({ width: rect.width, height: rect.height });

    // Compute circle-center anchors
    const radius = 32; // half of 64px diameter
    const points = circleRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return {
        x: r.left - rect.left + radius,
        y: r.top - rect.top + radius,
      };
    });

    // Fixed vertical spine at center of container
    const spineX = rect.width * 0.5;

    // Build one H→V→H path per step
    const segs: string[] = [];
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const d = `M ${prev.x} ${prev.y} H ${spineX} V ${curr.y} H ${curr.x}`;
      segs.push(d);
    }
    setSegments(segs);
  }, []);

  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl font-bold mb-16">
          How does an
          <br />
          AI SaaS Team Work?
        </h2>

        <div className="relative" ref={containerRef}>
          {/* Connector SVG */}
          <svg
            width={dims.width}
            height={dims.height}
            viewBox={`0 0 ${dims.width} ${dims.height}`}
            className="absolute inset-0 hidden lg:block"
            fill="none"
            pointerEvents="none"
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="6"
                markerHeight="6"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L0,6 L6,3 z" fill="#FF0080" />
              </marker>
            </defs>

            {segments.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke="#FF0080"
                strokeWidth="4"
                strokeDasharray="10,10"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  delay: i * 0.4,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </svg>

          {/* Steps */}
          <div className="grid gap-40 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className={`flex items-start gap-6 ${
                  idx % 2 === 0 ? "lg:ml-0" : "lg:ml-[50%]"
                }`}
              >
                <div
                  ref={(el) => {
                    if (el) circleRefs.current[idx] = el;
                  }}
                  className="flex-shrink-0 w-16 h-16 bg-[#FF0080] rounded-full flex items-center justify-center font-bold text-2xl"
                >
                  {step.number}
                </div>
                <div className="max-w-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
