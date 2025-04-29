
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const FloatingPanels: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate the rotation based on mouse position
    // Limit rotation to a small range for subtle effect
    setRotateX(((mouseY / rect.height) - 0.5) * 8);
    setRotateY(((mouseX / rect.width) - 0.5) * -8);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full perspective-1000"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {/* Messages Panel */}
        <motion.div
          className="absolute top-[10%] right-[10%] w-64 h-36 bg-white rounded-xl shadow-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm font-medium">Messages</span>
            </div>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-orange-100 mr-2 flex items-center justify-center">
              <span className="font-bold text-sm text-orange-600">A</span>
            </div>
            <div>
              <div className="text-xs font-medium">Aric's Myors</div>
              <div className="text-xs text-gray-500">Same teams wait</div>
            </div>
            <div className="ml-auto text-[10px] text-gray-400">2:01 AM</div>
          </div>
        </motion.div>

        {/* Tasks Panel */}
        <motion.div
          className="absolute top-[30%] right-[5%] w-72 h-64 bg-white rounded-xl shadow-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ transform: 'translateZ(60px)' }}
        >
          <div className="flex items-center mb-4">
            <div className="w-5 h-5 rounded-full bg-blue-100 mr-2 flex items-center justify-center">
              <span className="text-blue-600 text-xs">👤</span>
            </div>
            <span className="font-medium">Tasks</span>
            <div className="ml-auto text-xs text-gray-500">14</div>
          </div>
          
          <div className="space-y-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-blue-100 mr-2 flex items-center justify-center">
                  <span className="text-blue-600 text-xs">🔍</span>
                </div>
                <div>
                  <div className="text-xs font-medium">Launch planning</div>
                  <div className="text-[10px] text-gray-500">Laurin Counts</div>
                </div>
                <div className="ml-auto text-xs font-bold">2</div>
              </div>
            </div>
            
            <div className="p-2 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-green-100 mr-2 flex items-center justify-center">
                  <span className="text-green-600 text-xs">M</span>
                </div>
                <div>
                  <div className="text-xs font-medium">Mobile designs</div>
                  <div className="text-[10px] text-gray-500">Larren Ients</div>
                </div>
                <div className="ml-auto text-xs font-bold">13</div>
              </div>
            </div>
            
            <div className="p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-blue-100 mr-2 flex items-center justify-center">
                  <span className="text-blue-600 text-xs">W</span>
                </div>
                <div>
                  <div className="text-xs font-medium">Website redesign</div>
                  <div className="text-[10px] text-gray-500">API wrap</div>
                </div>
                <div className="ml-auto text-xs font-bold">6</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Panel */}
        <motion.div
          className="absolute bottom-[10%] right-[15%] w-60 h-48 bg-white rounded-xl shadow-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="flex items-center mb-4">
            <div className="w-5 h-5 rounded-full bg-blue-100 mr-2 flex items-center justify-center">
              <span className="text-blue-600 text-xs">📊</span>
            </div>
            <span className="font-medium">Dashboard</span>
          </div>
          
          <div className="text-xs mb-1">Active Users</div>
          <div className="w-full h-8 mb-4">
            <svg width="100%" height="100%" viewBox="0 0 100 20">
              <path 
                d="M0,10 Q10,5 20,10 T40,10 T60,5 T80,15 T100,10" 
                fill="none" 
                stroke="#e0e7ff" 
                strokeWidth="2"
              />
              <path 
                d="M0,10 Q10,5 20,10 T40,10 T60,5 T80,15 T100,10" 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="2" 
                strokeDasharray="100"
                strokeDashoffset="0"
              />
            </svg>
          </div>
          
          <div className="text-xs mb-1">Daily Usage</div>
          <div className="flex items-center">
            <div className="text-lg font-bold">24%</div>
            <div className="w-full h-2 bg-gray-100 rounded-full ml-4">
              <div className="w-1/4 h-full bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
