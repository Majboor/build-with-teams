
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';

interface VoiceInputCardProps {
  value: string;
  onChange: (value: string) => void;
  onRecord: () => void;
  isRecording: boolean;
}

// Placeholder texts to cycle through
const placeholders = [
  "Enter your idea or prompt...",
  "Build me an AI chatbot...",
  "Create a dashboard for my business...",
  "Design a landing page for my app...",
  "Develop a social network for pets...",
];

export const VoiceInputCard: React.FC<VoiceInputCardProps> = ({ 
  value, 
  onChange,
  onRecord,
  isRecording
}) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showRipple, setShowRipple] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Change placeholder text every few seconds
  useEffect(() => {
    if (!value) {
      const interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [value]);
  
  // Typing animation
  useEffect(() => {
    if (isRecording) {
      setIsTyping(true);
      setTypingText('');
      const textToType = "Listening to your idea...";
      let index = 0;
      
      const typeInterval = setInterval(() => {
        if (index < textToType.length) {
          setTypingText((prev) => prev + textToType[index]);
          index++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setTypingText('');
            index = 0;
          }, 1000);
        }
      }, 100);
      
      return () => clearInterval(typeInterval);
    } else {
      setIsTyping(false);
    }
  }, [isRecording]);
  
  const handleMicClick = () => {
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 1000);
    onRecord();
  };

  return (
    <motion.div
      className="relative overflow-visible"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative backdrop-blur-xl bg-white/30 rounded-2xl border border-white/40 shadow-lg p-2 transition-all hover:shadow-xl">
        <div className="flex items-center relative">
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholders[placeholderIndex]}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pr-14 border-none bg-transparent text-lg h-14 focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={isRecording}
          />
          
          <div className="absolute right-2 transition-all">
            <Button
              type="button"
              size="icon"
              variant={isRecording ? "destructive" : "secondary"}
              className={`rounded-full h-12 w-12 transition-all shadow-md ${
                isRecording 
                  ? 'animate-pulse bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200'
              }`}
              onClick={handleMicClick}
            >
              {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
            
            {/* Ripple effect */}
            <AnimatePresence>
              {showRipple && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20 z-0"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Typing animation when recording */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              className="absolute -bottom-8 left-4 text-sm text-gray-600"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              {typingText}<span className="animate-pulse">|</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Sound wave visualization when recording */}
        {isRecording && (
          <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
            <div className="flex items-center space-x-1">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-primary w-1 rounded-full"
                  animate={{ 
                    height: [5, Math.random() * 20 + 10, 5],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.05
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
