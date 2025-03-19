
import React, { useRef, useEffect, useState } from 'react';
import { Code, Globe, Cpu, Lightbulb } from 'lucide-react';
import SkillCard from './SkillCard';
import AnimatedText from './AnimatedText';

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

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-20 md:py-32"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-noise opacity-50" />
      
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary mb-6">
              About Me
            </div>
            
            <AnimatedText 
              text="I create websites that people love to use" 
              className="text-3xl md:text-4xl font-semibold mb-6"
              once
              delay={isVisible ? 0 : 0}
            />
            
            <div className={`space-y-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-foreground/70">
                I'm Mr. RockeY, a passionate full-stack web developer with expertise in modern web technologies. I combine technical skills with creative problem-solving to build digital products that stand out.
              </p>
              <p className="text-foreground/70">
                With a focus on performance optimization and user experience, I create websites that not only look beautiful but also convert visitors into customers.
              </p>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-3">Technical Expertise</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'SEO', 'UI/UX', 'API Design'].map((skill, index) => (
                    <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-sm inline-block text-center">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
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
