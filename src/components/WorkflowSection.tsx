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
  { number: "1", title: "Initial Consultation", description: "...", icon: User },
  { number: "2", title: "Tailored Proposal",    description: "...", icon: FileEdit },
  { number: "3", title: "Onboarding",           description: "...", icon: Users },
  { number: "4", title: "Execution and Support",description: "...", icon: ArrowRight },
  { number: "5", title: "Continuous Improvement",description: "...",icon: CircleArrowRight },
];

export function WorkflowSection() {
  // Refs for container and each step
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  // State for dynamic path string
  const [pathD, setPathD] = useState("");

  // Measure positions and build a neat H-V path
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    // compute anchor points for each step
    const points = stepRefs.current.map((el, idx) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      const isLeft = idx % 2 === 0;
      // pick left/right side of box, vertically centered
      const x = isLeft
        ? r.left - containerRect.left - 8   // 8px padding gap
        : r.right - containerRect.left + 8;
      const y = r.top - containerRect.top + r.height / 2;
      return { x, y };
    });

    // build the SVG path: M → H/V segments → …
    let d = `M ${points[0].x} ${points[0].y}`;
    points.slice(1).forEach((pt, i) => {
      const prev = points[i];
      // horizontal line to align with next x
      d += ` H ${pt.x}`;
      // vertical down/up to next y
      d += ` V ${pt.y}`;
    });

    setPathD(d);
  }, []);

  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl font-bold mb-16">
          How does an<br />AI SaaS Team Work?
        </h2>

        <div className="relative" ref={containerRef}>
          {/* Dynamic SVG Path with arrow marker */}
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
              animate={{ pathLength: 1, transition: { duration: 1.5, ease: "easeInOut" } }}
            />
          </svg>

          {/* Steps */}
          <div className="grid gap-40 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                ref={el => (stepRefs.current[idx] = el)}
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
