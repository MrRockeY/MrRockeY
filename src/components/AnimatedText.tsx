
import React, { useEffect, useRef, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className = "", 
  once = false,
  delay = 0 
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

  return (
    <div ref={textRef} className={`overflow-hidden ${className}`}>
      <div className="flex flex-wrap">
        {words.map((word, i) => (
          <span key={i} className="mr-2 overflow-hidden">
            <span
              className={`inline-block transform transition-transform duration-700 ease-out-expo ${
                isVisible ? 'translate-y-0' : 'translate-y-full'
              }`}
              style={{ transitionDelay: `${delay + i * 30}ms` }}
            >
              {word}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnimatedText;
