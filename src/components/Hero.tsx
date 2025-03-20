
import React, { useEffect, useState, useRef } from 'react';
import AnimatedText from './AnimatedText';
import ScrollDown from './ui/ScrollDown';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroBackground from './HeroBackground';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    // Delay animation to ensure it plays after initial page load
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    // Add a mousemove event for subtle mouse tracking effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
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
      {/* Interactive background */}
      <HeroBackground />
      
      {/* Background effects with parallax */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div 
          className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl dark:bg-primary/10 transition-transform duration-500" 
          style={{ transform: calculateTransform(-20) }} 
        />
        <motion.div 
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-400/5 blur-3xl dark:bg-blue-400/10 transition-transform duration-500"
          style={{ transform: calculateTransform(-15) }}
        />
      </div>
      
      <motion.div 
        className="section-container flex flex-col justify-center z-10"
        ref={containerRef}
        style={{ y, opacity }}
      >
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
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <Link 
                  to="#projects" 
                  className="btn-primary dark-glow group relative overflow-hidden"
                >
                  <span className="relative z-10">View My Work</span>
                  <span className="absolute inset-0 bg-primary/20 transform translate-y-full transition-transform group-hover:translate-y-0 duration-300 ease-out-expo" />
                  <motion.span 
                    className="absolute -inset-1 rounded-lg opacity-70 blur-sm bg-gradient-to-r from-primary/60 to-blue-500/60 dark:from-primary/80 dark:to-blue-500/80"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </Link>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link 
                  to="/order" 
                  className="btn-secondary group relative overflow-hidden"
                >
                  <span className="relative z-10">Order Services</span>
                  <span className="absolute inset-0 bg-secondary/30 transform translate-y-full transition-transform group-hover:translate-y-0 duration-300 ease-out-expo" />
                </Link>
              </motion.div>
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
        
        {/* Floating 3D elements */}
        <motion.div
          className="absolute right-[10%] top-1/3 w-20 h-20 md:w-32 md:h-32 hidden md:block"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          style={{ 
            transform: calculateTransform(10),
            rotateX: Math.sin(mousePosition.y * Math.PI) * 20, 
            rotateY: -Math.sin(mousePosition.x * Math.PI) * 20 
          }}
        >
          <div className="relative w-full h-full preserve-3d animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-blue-400/40 dark:from-primary/60 dark:to-blue-400/60 rounded-xl"></div>
            <div className="absolute inset-0 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-xl shadow-xl"></div>
          </div>
        </motion.div>
        
        <motion.div
          className="absolute left-[15%] bottom-1/3 w-16 h-16 md:w-24 md:h-24 hidden md:block"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          style={{ 
            transform: calculateTransform(-15),
            rotateX: Math.sin(mousePosition.y * Math.PI) * 20, 
            rotateY: -Math.sin(mousePosition.x * Math.PI) * 20 
          }}
        >
          <div className="relative w-full h-full preserve-3d animate-float" style={{ animationDelay: '-2s' }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/40 to-purple-500/40 dark:from-blue-400/60 dark:to-purple-500/60 rounded-full"></div>
            <div className="absolute inset-0 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-full shadow-xl"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
