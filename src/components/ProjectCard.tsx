
import React from 'react';
import { Eye, Github } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  imageUrl, 
  technologies, 
  liveUrl, 
  githubUrl,
  index 
}) => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div 
      className="card-hover overflow-hidden rounded-xl bg-white dark:bg-gray-800/50 border border-border dark:border-white/10 h-full relative group"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="relative overflow-hidden h-48">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <motion.img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out-expo"
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />
        
        <div className="absolute top-4 right-4 flex space-x-2 z-20 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <a 
            href={liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
            aria-label="View live site"
          >
            <Eye className="w-4 h-4" />
          </a>
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
            aria-label="View GitHub repository"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 dark:text-white/90">{title}</h3>
        <p className="text-foreground/60 dark:text-white/60 text-sm mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {technologies.map((tech, i) => (
            <motion.span 
              key={i} 
              className="text-xs font-medium px-2 py-1 bg-secondary dark:bg-gray-700/70 text-foreground/70 dark:text-white/70 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-primary/80"
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
      />
    </motion.div>
  );
};

export default ProjectCard;
