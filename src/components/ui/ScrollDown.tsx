
import React from 'react';
import { ChevronDown } from 'lucide-react';

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
    <button 
      onClick={scrollToTarget}
      className={`animate-bounce-soft p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-300 ${className}`}
      aria-label="Scroll down"
    >
      <ChevronDown className="w-6 h-6" />
    </button>
  );
};

export default ScrollDown;
