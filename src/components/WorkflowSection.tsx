
import React from "react";
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
    description: "We start with a comprehensive consultation to understand your business needs, goals, and current AI capabilities",
    icon: User,
  },
  {
    number: "2",
    title: "Tailored Proposal",
    description: "Based on our assessment, we provide a detailed proposal outlining the scope of work, timeline, and team composition",
    icon: FileEdit,
  },
  {
    number: "3",
    title: "Onboarding",
    description: "Once approved, we assemble your AI team and begin the onboarding process, integrating seamlessly with your existing workflows",
    icon: Users,
  },
  {
    number: "4",
    title: "Execution and Support",
    description: "Our team works closely with you to execute the project, providing regular updates and ongoing support to ensure success",
    icon: ArrowRight,
  },
  {
    number: "5",
    title: "Continuous Improvement",
    description: "Post-deployment, we offer continuous monitoring and optimization to ensure your AI solutions deliver maximum value",
    icon: CircleArrowRight,
  },
];

const pathVariants = {
  initial: { pathLength: 0 },
  animate: {
    pathLength: 1,
    transition: { duration: 2, ease: "easeInOut" }
  }
};

export function WorkflowSection() {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl font-bold mb-16">
          How does an<br />AI SaaS Team Work?
        </h2>
        
        <div className="relative">
          {/* SVG Path */}
          <svg
            className="absolute hidden lg:block"
            width="100%"
            height="100%"
            viewBox="0 0 1200 1000"
            fill="none"
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'none',
              zIndex: 0
            }}
          >
            <motion.path
              d="M100 100 L600 100
                 M600 100 L600 300
                 M600 300 L100 300
                 M100 300 L100 500
                 M100 500 L600 500
                 M600 500 L600 700
                 M600 700 L100 700
                 M100 700 L100 900"
              stroke="#FF0080"
              strokeWidth="2"
              strokeDasharray="8,8"
              variants={pathVariants}
              initial="initial"
              animate="animate"
              fill="none"
            />
          </svg>

          {/* Steps */}
          <div className="grid gap-24 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className={`flex items-start gap-6 ${
                  index % 2 === 0 ? 'lg:ml-0' : 'lg:ml-[50%]'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex-shrink-0 w-16 h-16 bg-[#FF0080] rounded-full flex items-center justify-center font-bold text-2xl">
                  {step.number}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <p className="text-gray-400 max-w-md">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
