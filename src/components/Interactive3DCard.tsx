
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Interactive3DCardProps {
  children: React.ReactNode;
  backgroundColor?: string;
  borderColor?: string;
  className?: string;
  depth?: number;
  dampen?: number;
}

const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  children,
  backgroundColor = 'bg-white dark:bg-black/50',
  borderColor = 'border-border dark:border-white/10',
  className = '',
  depth = 10,
  dampen = 10,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate rotation values based on mouse position relative to card center
    const rotateYValue = ((mouseX - centerX) / (rect.width / 2)) * (depth / dampen);
    const rotateXValue = ((mouseY - centerY) / (rect.height / 2)) * -(depth / dampen);
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };
  
  const handleMouseLeave = () => {
    // Reset rotation when mouse leaves
    setRotateX(0);
    setRotateY(0);
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`perspective ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={`preserve-3d rounded-xl ${backgroundColor} border ${borderColor} p-6 transition-all duration-200 ease-out-expo`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          boxShadow: `0 ${10 + Math.abs(rotateX)}px ${20 + Math.abs(rotateY)}px rgba(0, 0, 0, 0.1)`,
        }}
      >
        <div className="backface-hidden">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Interactive3DCard;
