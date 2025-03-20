
import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Initial loading animation
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  // Initialize observer for revealing section elements on scroll
  useEffect(() => {
    const revealSections = () => {
      const sections = document.querySelectorAll('.section-transition');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      });
      
      sections.forEach(section => {
        observer.observe(section);
      });
      
      return () => {
        sections.forEach(section => {
          observer.unobserve(section);
        });
      };
    };
    
    revealSections();
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 bg-background dark:bg-black flex items-center justify-center z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              className="text-3xl md:text-4xl font-semibold text-gradient"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              Mr.<span className="text-gradient">RockeY</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="min-h-screen bg-background overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Navigation />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
