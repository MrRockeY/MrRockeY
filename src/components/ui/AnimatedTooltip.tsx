
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({
  content,
  children,
  direction = 'top',
  delay = 0.5,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  // Direction-based positioning
  const getTooltipStyles = () => {
    switch (direction) {
      case 'top':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '10px',
        };
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '10px',
        };
      case 'left':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: '10px',
        };
      case 'right':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '10px',
        };
      default:
        return {};
    }
  };

  // Direction-based animations
  const getAnimationVariants = () => {
    switch (direction) {
      case 'top':
        return {
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 },
        };
      case 'bottom':
        return {
          hidden: { opacity: 0, y: -10 },
          visible: { opacity: 1, y: 0 },
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: 10 },
          visible: { opacity: 1, x: 0 },
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: -10 },
          visible: { opacity: 1, x: 0 },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  // Direction-based arrow positioning
  const getArrowStyles = () => {
    const base = 'absolute w-2 h-2 bg-black dark:bg-gray-800 transform rotate-45';
    
    switch (direction) {
      case 'top':
        return `${base} bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2`;
      case 'bottom':
        return `${base} top-0 left-1/2 -translate-x-1/2 -translate-y-1/2`;
      case 'left':
        return `${base} right-0 top-1/2 translate-x-1/2 -translate-y-1/2`;
      case 'right':
        return `${base} left-0 top-1/2 -translate-x-1/2 -translate-y-1/2`;
      default:
        return base;
    }
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute z-50 whitespace-nowrap"
            style={getTooltipStyles()}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={getAnimationVariants()}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <div className="px-3 py-2 text-xs font-medium text-white bg-black rounded-md shadow-lg dark:bg-gray-800 dark:text-white/90 backdrop-blur-sm">
                {content}
              </div>
              <div className={getArrowStyles()} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedTooltip;
