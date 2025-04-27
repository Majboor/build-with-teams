
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

const arrowVariants = {
  initial: { opacity: 0 },
  animate: (custom: number) => ({
    opacity: 1,
    transition: { delay: 0.5 + custom * 0.4 }
  })
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
            viewBox="0 0 1200 900"
            fill="none"
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'none',
              zIndex: 0
            }}
          >
            {/* Main path connecting all steps */}
            <motion.path
              d="M200 80 L600 80
                 M600 80 L600 240
                 M600 240 L200 240
                 M200 240 L200 400
                 M200 400 L600 400
                 M600 400 L600 560
                 M600 560 L200 560
                 M200 560 L200 720"
              stroke="#FF0080"
              strokeWidth="4"
              strokeDasharray="10,10"
              variants={pathVariants}
              initial="initial"
              animate="animate"
              fill="none"
            />
            
            {/* Arrow markers at each turning point */}
            <motion.path 
              d="M590 80 L600 80 L600 90"
              stroke="#FF0080"
              strokeWidth="4"
              fill="none"
              variants={arrowVariants}
              custom={0}
              initial="initial"
              animate="animate"
            />
            
            <motion.path 
              d="M600 230 L600 240 L590 240"
              stroke="#FF0080"
              strokeWidth="4"
              fill="none"
              variants={arrowVariants}
              custom={1}
              initial="initial"
              animate="animate"
            />
            
            <motion.path 
              d="M210 240 L200 240 L200 250"
              stroke="#FF0080"
              strokeWidth="4"
              fill="none"
              variants={arrowVariants}
              custom={2}
              initial="initial"
              animate="animate"
            />
            
            <motion.path 
              d="M200 390 L200 400 L210 400"
              stroke="#FF0080"
              strokeWidth="4"
              fill="none"
              variants={arrowVariants}
              custom={3}
              initial="initial"
              animate="animate"
            />
            
            <motion.path 
              d="M590 400 L600 400 L600 410"
              stroke="#FF0080"
              strokeWidth="4"
              fill="none"
              variants={arrowVariants}
              custom={4}
              initial="initial"
              animate="animate"
            />
            
            <motion.path 
              d="M600 550 L600 560 L590 560"
              stroke="#FF0080"
              strokeWidth="4"
              fill="none"
              variants={arrowVariants}
              custom={5}
              initial="initial"
              animate="animate"
            />
            
            <motion.path 
              d="M210 560 L200 560 L200 570"
              stroke="#FF0080"
              strokeWidth="4"
              fill="none"
              variants={arrowVariants}
              custom={6}
              initial="initial"
              animate="animate"
            />
            
            {/* Terminal arrowheads pointing directly at each step */}
            <motion.path 
              d="M595 240 L605 230 L615 240"
              stroke="#FF0080"
              strokeWidth="4"
              fill="none"
              variants={arrowVariants}
              custom={1.5}
              initial="initial"
              animate="animate"
            />
            
            <motion.path 
              d="M195 400 L205 390 L215 400"
              stroke="#FF0080"
              strokeWidth="4"
              fill="none"
              variants={arrowVariants}
              custom={2.5}
              initial="initial"
              animate="animate"
            />
            
            <motion.path 
              d="M595 560 L605 550 L615 560"
              stroke="#FF0080"
              strokeWidth="4"
              fill="none"
              variants={arrowVariants}
              custom={3.5}
              initial="initial"
              animate="animate"
            />
            
            <motion.path 
              d="M195 720 L205 710 L215 720"
              stroke="#FF0080"
              strokeWidth="4"
              fill="none"
              variants={arrowVariants}
              custom={4.5}
              initial="initial"
              animate="animate"
            />
          </svg>

          {/* Steps */}
          <div className="grid gap-40 relative z-10">
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
