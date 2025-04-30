
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
  const [typingProgress, setTypingProgress] = useState(0);
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  useEffect(() => {
    // Stage 1: Initial fade in delay
    const visibilityTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Stage 2: Start typing effect after title appears
    const typingTimeout = setTimeout(() => {
      const duration = subtitle.length * 40; // 40ms per character
      const startTime = Date.now();
      
      const typingInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setTypingProgress(progress);
        
        if (progress === 1) {
          clearInterval(typingInterval);
          // Stage 3: Show description after typing completes
          setTimeout(() => setDescriptionVisible(true), 300);
        }
      }, 16); // ~60fps
      
      return () => clearInterval(typingInterval);
    }, 900);

    return () => {
      clearTimeout(visibilityTimeout);
      clearTimeout(typingTimeout);
    };
  }, [subtitle]);

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="space-y-2"
            initial="hidden"
            animate="visible"
          >
            {/* Main Title with 3D effect */}
            <motion.div
              className="perspective-1000"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-[64px] font-bold leading-none preserve-3d"
                initial={{ opacity: 0, y: 20, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                  {title}
                </span>
              </motion.h1>
            </motion.div>

            {/* Subtitle with typing effect */}
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.p
                className="text-2xl sm:text-3xl lg:text-[40px] font-normal leading-tight"
              >
                <span className="inline-block overflow-hidden">
                  {subtitle.slice(0, Math.floor(subtitle.length * typingProgress))}
                </span>
                <span className="inline-block animate-pulse">|</span>
              </motion.p>
            </motion.div>
            
            {/* Description with fade-in effect */}
            <AnimatePresence>
              {descriptionVisible && (
                <motion.p
                  className="text-lg sm:text-xl font-normal max-w-md text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {description}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
