
import React from 'react';
import { motion } from 'framer-motion';

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div 
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <div className="card-hover bg-background dark:bg-gray-800/50 backdrop-blur-sm overflow-hidden p-6 rounded-xl border border-border dark:border-white/10 h-full relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className="bg-primary/10 dark:bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-primary dark:text-primary/90 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        <h3 className="text-lg font-medium mb-2 dark:text-white/90">{title}</h3>
        <p className="text-sm text-foreground/60 dark:text-white/60">{description}</p>
        
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary/60 to-primary/20 dark:from-primary/80 dark:to-primary/30"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: (delay / 1000) + 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default SkillCard;
