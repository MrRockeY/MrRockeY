
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedTooltip from '../ui/AnimatedTooltip';

interface ScrollDownProps {
  targetId: string;
  className?: string;
  showTooltip?: boolean;
  tooltipText?: string;
}

const ScrollDown: React.FC<ScrollDownProps> = ({ 
  targetId, 
  className = "",
  showTooltip = true,
  tooltipText = "Scroll Down"
}) => {
  const scrollToTarget = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatedTooltip content={showTooltip ? tooltipText : null} direction="top">
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
          {/* Outer glow ring */}
          <motion.span 
            className="absolute -inset-3 rounded-full border border-white/20 dark:border-white/10 opacity-0 blur-sm"
            animate={{ 
              opacity: [0, 0.7, 0], 
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut"
            }}
          />
          
          {/* Inner pulse */}
          <motion.span 
            className="absolute -inset-2 rounded-full bg-primary/20 dark:bg-primary/30 opacity-0 blur-sm"
            animate={{ 
              opacity: [0, 0.5, 0], 
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          
          <ChevronDown className="w-6 h-6 text-primary dark:text-primary/90" />
        </div>
      </motion.button>
    </AnimatedTooltip>
  );
};

export default ScrollDown;
