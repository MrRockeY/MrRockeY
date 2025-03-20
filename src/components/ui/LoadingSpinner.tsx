
import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background dark:bg-gray-900/95">
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-16 h-16 relative">
          <motion.span
            className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.span
            className="absolute inset-2 rounded-full border-4 border-r-blue-400 border-t-transparent border-b-transparent border-l-transparent"
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div className="w-4 h-4 bg-primary rounded-full" />
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-2 dark:text-white/90">Loading</h3>
        <p className="text-sm text-foreground/60 dark:text-white/60">Please wait a moment...</p>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
