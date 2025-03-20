
import React, { useState, useRef, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import AnimatedText from './AnimatedText';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('all');
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

  const projects = [
    {
      title: 'Multi-SEO Tool Website',
      description: 'A comprehensive suite of SEO tools to analyze and optimize website performance.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
      liveUrl: 'https://freeseotool.github.io',
      githubUrl: 'https://github.com/username/seo-tool',
      category: 'seo',
    },
    {
      title: 'TopReview Blog',
      description: 'A product review blog with an elegant layout and advanced filtering options.',
      imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2670&auto=format&fit=crop',
      technologies: ['React', 'Next.js', 'Tailwind CSS'],
      liveUrl: 'https://example.com/topreview',
      githubUrl: 'https://github.com/username/topreview',
      category: 'web',
    },
    {
      title: 'Dragon Repeller RPG',
      description: 'A text-based RPG game built with HTML5, CSS, and JavaScript.',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      liveUrl: 'https://example.com/dragon-rpg',
      githubUrl: 'https://github.com/username/dragon-rpg',
      category: 'game',
    },
    {
      title: 'Portfolio Website',
      description: 'A modern portfolio website with smooth animations and intuitive interface.',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: 'https://example.com/portfolio',
      githubUrl: 'https://github.com/username/portfolio',
      category: 'web',
    },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'seo', label: 'SEO Tools' },
    { id: 'game', label: 'Games' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="py-20 md:py-32 bg-secondary/30 dark:bg-gray-900/50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl dark:bg-primary/5" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-400/5 blur-3xl dark:bg-blue-400/5" />
      </div>
      
      <div className="section-container relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-block rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            My Projects
          </motion.div>
          
          <AnimatedText 
            text="Selected work I've crafted" 
            className="text-3xl md:text-4xl font-semibold mb-6 mx-auto"
            once
            type="words"
            highlight
            delay={isVisible ? 300 : 0}
          />
          
          <motion.p 
            className="text-foreground/60 dark:text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Browse through my recent projects showcasing my expertise in web development, SEO optimization, and interactive experiences.
          </motion.p>
        </motion.div>
        
        {/* Project Filters */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="inline-flex bg-white dark:bg-gray-800/90 rounded-full p-1 shadow-sm">
            {categories.map((category, i) => (
              <motion.button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-300 relative ${
                  filter === category.id 
                    ? 'text-white z-10' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white/80'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.6 }}
                whileHover={{ scale: filter === category.id ? 1 : 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {filter === category.id && (
                  <motion.span 
                    className="absolute inset-0 bg-primary rounded-full -z-10"
                    layoutId="filterBackground"
                    transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
                  />
                )}
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Project Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              index={index}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              technologies={project.technologies}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
