
import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  technologies,
  liveUrl,
  githubUrl,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 100);
          
          if (cardRef.current) {
            observer.unobserve(cardRef.current);
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className={`rounded-2xl overflow-hidden perspective transition-all duration-700 ease-out-expo ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        {/* Project Image */}
        <div className="relative overflow-hidden aspect-[16/9]">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out-expo"
            style={{ 
              backgroundImage: `url(${imageUrl})`,
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }} 
          />
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
              isHovered ? 'opacity-90' : 'opacity-0'
            }`}
          />
          
          {/* Overlay content on hover */}
          <div 
            className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex space-x-4 mb-4">
              {liveUrl && (
                <a 
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-white bg-primary/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm hover:bg-primary transition-colors duration-200"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                  <span>Live Demo</span>
                </a>
              )}
              
              {githubUrl && (
                <a 
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-white bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm hover:bg-black/80 transition-colors duration-200"
                >
                  <Github className="w-3.5 h-3.5 mr-1.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Project Info */}
        <div className="p-6">
          <h3 className="text-xl font-medium mb-2">{title}</h3>
          <p className="text-foreground/60 text-sm mb-4">{description}</p>
          
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-secondary rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
