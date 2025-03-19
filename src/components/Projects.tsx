
import React, { useState, useRef, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import AnimatedText from './AnimatedText';

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

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-32 bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary mb-6">
            My Projects
          </div>
          
          <AnimatedText 
            text="Selected work I've crafted" 
            className="text-3xl md:text-4xl font-semibold mb-6 mx-auto"
            once
            delay={isVisible ? 0 : 0}
          />
          
          <p className={`text-foreground/60 max-w-2xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Browse through my recent projects showcasing my expertise in web development, SEO optimization, and interactive experiences.
          </p>
        </div>
        
        {/* Project Filters */}
        <div className={`flex justify-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '200ms' }}>
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                  filter === category.id 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'hover:bg-secondary'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              index={index}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              technologies={project.technologies}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
