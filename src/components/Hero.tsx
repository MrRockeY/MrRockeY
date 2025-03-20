
import React, { useEffect, useState, useRef } from 'react';
import AnimatedText from './AnimatedText';
import ScrollDown from './ui/ScrollDown';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Delay animation to ensure it plays after initial page load
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    // Add a scroll event for parallax effect
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollTop = window.scrollY;
        const opacity = Math.max(0, 1 - scrollTop / 700); // Fade out as user scrolls
        const transform = `translateY(${scrollTop * 0.3}px)`; // Parallax effect
        
        heroRef.current.style.opacity = opacity.toString();
        heroRef.current.querySelector('.section-container')!.setAttribute('style', `transform: ${transform}`);
      }
    };

    // Add a mousemove event for subtle mouse tracking effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const calculateTransform = (factor: number) => {
    return `translate(${mousePosition.x * factor}px, ${mousePosition.y * factor}px)`;
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      ref={heroRef}
    >
      {/* Background effects with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl dark:bg-primary/10 transition-transform duration-500" 
          style={{ transform: calculateTransform(-20) }} 
        />
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-400/5 blur-3xl dark:bg-blue-400/10 transition-transform duration-500"
          style={{ transform: calculateTransform(-15) }}
        />
      </div>
      
      <div className="section-container flex flex-col justify-center transition-transform duration-500 ease-out z-10">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <p className="text-sm md:text-base uppercase tracking-wider mb-2 md:mb-4 text-primary font-medium dark:text-primary/90 dark:font-semibold inline-block relative overflow-hidden">
              <span className="relative z-10">Full-Stack Web Developer & SEO Expert</span>
              <motion.span 
                initial={{ width: '100%' }}
                animate={{ width: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-0 h-full bg-background dark:bg-background"
              />
            </p>
            
            <h1 className="text-5xl md:text-7xl font-semibold mb-6 tracking-tighter leading-tight dark:text-white/95 dark-text-shadow">
              <AnimatedText 
                text="Hi, I'm Mr. RockeY" 
                className="mb-2"
                once
                delay={200}
              />
              <AnimatedText 
                text="I build exceptional digital experiences" 
                className="text-3xl md:text-5xl text-foreground/80 dark:text-white/80"
                once
                delay={600}
              />
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-foreground/60 dark:text-white/70 max-w-2xl mb-10"
            >
              I specialize in creating high-performance websites, interactive UI/UX, 
              and SEO-optimized platforms to maximize user engagement.
            </motion.p>
            
            <div className="flex flex-wrap gap-4">
              <motion.a 
                href="#projects" 
                className="btn-primary dark-glow group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">View My Work</span>
                <span className="absolute inset-0 bg-primary/20 transform translate-y-full transition-transform group-hover:translate-y-0 duration-300 ease-out-expo" />
              </motion.a>
              
              <motion.a 
                href="/order" 
                className="btn-secondary group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Order Services</span>
                <span className="absolute inset-0 bg-secondary/30 transform translate-y-full transition-transform group-hover:translate-y-0 duration-300 ease-out-expo" />
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <ScrollDown targetId="about" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
