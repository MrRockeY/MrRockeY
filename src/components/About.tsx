
import React, { useRef, useEffect, useState } from 'react';
import { Code, Globe, Cpu, Lightbulb } from 'lucide-react';
import SkillCard from './SkillCard';
import AnimatedText from './AnimatedText';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skills = [
    { 
      icon: <Code className="w-8 h-8" />, 
      title: 'Web Development', 
      description: 'Building responsive, high-performance websites with modern frameworks and best practices.'
    },
    { 
      icon: <Globe className="w-8 h-8" />, 
      title: 'SEO Expert', 
      description: 'Optimizing websites for search engines to increase visibility and drive organic traffic.'
    },
    { 
      icon: <Cpu className="w-8 h-8" />, 
      title: 'Full-Stack Development', 
      description: 'Creating comprehensive solutions from backend APIs to seamless frontend experiences.'
    },
    { 
      icon: <Lightbulb className="w-8 h-8" />, 
      title: 'UI/UX Design', 
      description: 'Designing intuitive interfaces that balance aesthetics with functionality.'
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-20 md:py-32"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-noise opacity-50 dark:opacity-20" />
      
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
            variants={container}
          >
            <motion.div variants={item} className="inline-block rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary mb-6">
              About Me
            </motion.div>
            
            <AnimatedText 
              text="I create websites that people love to use" 
              className="text-3xl md:text-4xl font-semibold mb-6"
              once
              delay={isVisible ? 0 : 0}
            />
            
            <div className="space-y-4">
              <motion.p 
                variants={item} 
                className="text-foreground/70 dark:text-white/70"
              >
                I'm Mr. RockeY, a passionate full-stack web developer with expertise in modern web technologies. I combine technical skills with creative problem-solving to build digital products that stand out.
              </motion.p>
              <motion.p 
                variants={item} 
                className="text-foreground/70 dark:text-white/70"
              >
                With a focus on performance optimization and user experience, I create websites that not only look beautiful but also convert visitors into customers.
              </motion.p>
              
              <motion.div variants={item} className="pt-4">
                <h3 className="text-lg font-medium mb-3 dark:text-white/90">Technical Expertise</h3>
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-4 gap-2"
                  variants={container}
                  initial="hidden"
                  animate={isVisible ? "show" : "hidden"}
                >
                  {['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'SEO', 'UI/UX', 'API Design'].map((skill, index) => (
                    <motion.span 
                      key={index} 
                      className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-sm inline-block text-center hover:bg-primary hover:text-white transition-colors duration-300"
                      variants={item}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <SkillCard 
                key={index}
                icon={skill.icon}
                title={skill.title}
                description={skill.description}
                delay={isVisible ? index * 100 : 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
