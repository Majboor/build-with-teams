
import React from 'react';
import { motion } from 'framer-motion';

export const HeroIllustration: React.FC = () => {
  return (
    <motion.div
      className="relative w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="relative w-full h-full">
        {/* Voice Input Card */}
        <motion.div
          className="absolute top-[40%] left-0 transform -translate-y-1/2 z-30 w-64 sm:w-80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 flex items-center">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-3 mr-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15.5C14.21 15.5 16 13.71 16 11.5V6C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6V11.5C8 13.71 9.79 15.5 12 15.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.34961 9.65002V11.35C4.34961 15.57 7.77961 19 11.9996 19C16.2196 19 19.6496 15.57 19.6496 11.35V9.65002" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-gray-600 dark:text-gray-300">Speak your idea...</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 2.75C14.7279 2.75 17.3532 5.13711 17.7192 8.25H19.25C21.0449 8.25 22.5 9.70507 22.5 11.5C22.5 13.2949 21.0449 14.75 19.25 14.75H17.7192C17.3532 17.8629 14.7279 20.25 11.5 20.25C7.77208 20.25 4.75 17.2279 4.75 13.5V9.5C4.75 5.77208 7.77208 2.75 11.5 2.75Z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>
          <div className="mt-2 flex justify-center">
            <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              {[...Array(10)].map((_, i) => (
                <rect 
                  key={i} 
                  x={i * 12} 
                  y={15 - Math.random() * 10} 
                  width="4" 
                  height={Math.random() * 20 + 5} 
                  rx="2" 
                  fill="rgba(99, 102, 241, 0.6)"
                />
              ))}
            </svg>
          </div>
        </motion.div>

        {/* Tasks Panel */}
        <motion.div
          className="absolute top-0 right-10 w-64 sm:w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="font-medium">Tasks</p>
              <div className="ml-auto px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-xs">14</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                  <span className="text-xs font-medium">L</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Launch planning</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Laurin Counts</p>
                </div>
                <div className="ml-auto px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-600 text-xs">2</div>
              </div>
              <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mr-3">
                  <span className="text-xs font-medium">M</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Mobile designs</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Lerren lents</p>
                </div>
                <div className="ml-auto px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-600 text-xs">13</div>
              </div>
              <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                  <span className="text-xs font-medium">W</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Website redesign</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">API wrag</p>
                </div>
                <div className="ml-auto px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-600 text-xs">6</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Message Notification */}
        <motion.div
          className="absolute top-24 right-52 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="p-4">
            <div className="flex items-center mb-3">
              <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              </div>
              <p className="font-medium">Messages</p>
              <div className="ml-auto text-xs text-gray-500">2:01 AM</div>
            </div>
            <div className="flex items-center">
              <img src="https://i.pravatar.cc/300" alt="User" className="h-8 w-8 rounded-full mr-2" />
              <div>
                <p className="text-sm font-medium">Aric's Myors</p>
                <p className="text-xs text-gray-500">Same teams went</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Panel */}
        <motion.div
          className="absolute bottom-10 right-10 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className="h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="font-medium">Dashboard</p>
            </div>
            <div className="mb-4">
              <p className="text-sm mb-1">Active Users</p>
              <svg width="100%" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 30L10 28L20 32L30 25L40 28L50 20L60 22L70 15L80 18L90 10L100 15L110 8L120 12L130 5L140 8L150 15L160 10L170 18L180 12L190 15L200 10" stroke="#4F46E5" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div>
              <p className="text-sm mb-1">Daily Usage</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold">24%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "24%" }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
