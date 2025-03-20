
import React, { useEffect, useState, useRef } from 'react';
import AnimatedText from './AnimatedText';
import ScrollDown from './ui/ScrollDown';

const Hero: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
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

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center pt-20"
      ref={heroRef}
    >
      {/* Background effects with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" 
             style={{ transform: 'translateY(0)', transition: 'transform 0.5s ease-out' }} />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-400/5 blur-3xl dark:bg-blue-400/10"
             style={{ transform: 'translateY(0)', transition: 'transform 0.5s ease-out' }} />
      </div>
      
      <div className="section-container flex flex-col justify-center transition-transform duration-500 ease-out">
        <div className="max-w-4xl">
          <div className={`transition-all duration-1000 ease-out-expo ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-sm md:text-base uppercase tracking-wider mb-2 md:mb-4 text-primary font-medium dark:text-primary/90 dark:font-semibold">
              Full-Stack Web Developer & SEO Expert
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
            
            <p className="text-lg md:text-xl text-foreground/60 dark:text-white/70 max-w-2xl mb-10 animate-fade-in opacity-0" style={{ animationDelay: '1000ms' }}>
              I specialize in creating high-performance websites, interactive UI/UX, 
              and SEO-optimized platforms to maximize user engagement.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-fade-in opacity-0" style={{ animationDelay: '1200ms' }}>
              <a href="#projects" className="btn-primary dark-glow">
                View My Work
              </a>
              <a href="/order" className="btn-secondary">
                Order Services
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-fade-in opacity-0" 
             style={{ animationDelay: '1800ms' }}>
          <ScrollDown targetId="about" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
