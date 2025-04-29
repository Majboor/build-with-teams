
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedHeadlineProps {
  title: string;
  subtitle: string;
  description: string;
}

export const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({
  title,
  subtitle,
  description
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="space-y-2"
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-[64px] font-bold leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="text-2xl sm:text-3xl lg:text-[40px] font-normal leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {subtitle}
            </motion.p>
            
            <motion.p
              className="text-lg sm:text-xl font-normal max-w-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {description}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
