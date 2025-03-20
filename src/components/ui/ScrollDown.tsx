
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScrollDownProps {
  targetId: string;
  className?: string;
}

const ScrollDown: React.FC<ScrollDownProps> = ({ targetId, className = "" }) => {
  const scrollToTarget = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.button 
      onClick={scrollToTarget}
      className={`p-2 rounded-full opacity-70 hover:opacity-100 transition-all duration-300 relative ${className}`}
      aria-label="Scroll down"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ y: -10, opacity: 0 }}
      animate={{ 
        y: [0, 10, 0], 
        opacity: 1,
        transition: {
          y: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          },
          opacity: {
            duration: 0.5
          }
        }
      }}
    >
      <div className="relative">
        <span className="absolute -inset-3 rounded-full border border-white/20 dark:border-white/10 animate-ping opacity-75 blur-sm" />
        <ChevronDown className="w-6 h-6 text-primary dark:text-primary/90" />
      </div>
    </motion.button>
  );
};

export default ScrollDown;
