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
  const stepRefs = useRef<HTMLDivElement[]>([]);
  const [pathD, setPathD] = useState<string>("");

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const circleRadius = 32; // half of 64px icon

    // compute anchor points at each circle's center
    const points = stepRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return {
        x: r.left - rect.left + circleRadius,
        y: r.top - rect.top + circleRadius,
      };
    });

    // build zig-zag path: H → V → H between each pair of points
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midX = (prev.x + curr.x) / 2;
      d += ` H ${midX}`;      // horizontal to midpoint
      d += ` V ${curr.y}`;     // vertical to target y
      d += ` H ${curr.x}`;     // horizontal to target x
    }

    setPathD(d);
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
            className="absolute inset-0 hidden lg:block"
            viewBox="0 0 1200 900"
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
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L0,6 L6,3 z" fill="#FF0080" />
              </marker>
            </defs>

            <motion.path
              d={pathD}
              stroke="#FF0080"
              strokeWidth="4"
              strokeDasharray="10,10"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                transition: { duration: 1.5, ease: "easeInOut" },
              }}
            />
          </svg>

          {/* Steps */}
          <div className="grid gap-40 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                ref={(el) => {
                  if (el) stepRefs.current[idx] = el;
                }}
                className={`flex items-start gap-6 ${
                  idx % 2 === 0 ? "lg:ml-0" : "lg:ml-[50%]"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="flex-shrink-0 w-16 h-16 bg-[#FF0080] rounded-full flex items-center justify-center font-bold text-2xl">
                  {step.number}
                </div>
                <div className="max-w-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
