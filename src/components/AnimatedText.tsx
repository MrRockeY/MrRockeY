
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  highlight?: boolean;
  type?: 'words' | 'chars' | 'lines';
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className = "", 
  once = false,
  delay = 0,
  highlight = false,
  type = 'words'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          
          if (once && textRef.current) {
            observer.unobserve(textRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [once, delay]);

  const words = text.split(' ');
  const letters = text.split('');
  const lines = text.split('\\n');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: type === 'chars' ? 0.03 : 0.08, 
        delayChildren: delay * 0.001 * i,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      }
    }
  };

  return (
    <div ref={textRef} className={`overflow-hidden ${className}`}>
      {type === 'words' && (
        <motion.div
          className="flex flex-wrap"
          variants={container}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {words.map((word, i) => (
            <motion.span key={i} className="mr-2 overflow-hidden" variants={child}>
              <span className={highlight ? "text-gradient" : ""}>
                {word}
              </span>
            </motion.span>
          ))}
        </motion.div>
      )}

      {type === 'chars' && (
        <motion.div
          className="inline-block"
          variants={container}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {letters.map((letter, i) => (
            <motion.span key={i} variants={child} className="inline-block">
              <span className={highlight ? "text-gradient" : ""}>
                {letter === " " ? "\u00A0" : letter}
              </span>
            </motion.span>
          ))}
        </motion.div>
      )}

      {type === 'lines' && (
        <motion.div
          className="flex flex-col"
          variants={container}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {lines.map((line, i) => (
            <motion.div key={i} className="overflow-hidden" variants={child}>
              <span className={highlight ? "text-gradient" : ""}>
                {line}
              </span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedText;
