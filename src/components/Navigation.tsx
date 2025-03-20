
import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Code, Mail, ChevronRight } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedTooltip from './ui/AnimatedTooltip';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      setScrolled(window.scrollY > scrollThreshold);

      // Check which section is in view
      const sections = ['hero', 'about', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // If the section is partially in view
          if (rect.top < windowHeight * 0.5 && rect.bottom > 0) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { href: "#about", label: "About", icon: <User className="w-4 h-4" /> },
    { href: "#projects", label: "Projects", icon: <Code className="w-4 h-4" /> },
    { href: "#contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
    { href: "/order", label: "Order Services", icon: <ChevronRight className="w-4 h-4" /> }
  ];

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      return activeSection === sectionId;
    }
    return location.pathname === href;
  };

  const headerVariants = {
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    hidden: { 
      y: -20, 
      opacity: 0,
      transition: { 
        duration: 0.3,
        ease: "easeInOut" 
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <motion.header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-lg shadow-sm dark:bg-black/50 dark:shadow-md dark:shadow-black/20' : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <motion.a 
            href="#hero" 
            className="text-xl font-bold tracking-tighter dark:text-white/95 relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Mr.<span className="text-gradient">RockeY</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-primary/80 transition-all duration-300 group-hover:w-full origin-left"></span>
          </motion.a>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a 
                key={item.href}
                href={item.href} 
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary dark:hover:text-primary/90 relative group ${
                  isActive(item.href) 
                    ? 'text-primary dark:text-primary/90 font-semibold' 
                    : 'text-foreground/80 dark:text-white/80'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <AnimatedTooltip content={item.label} delay={0.3}>
                  <span className="flex items-center">
                    {item.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary dark:bg-primary/80 transition-all duration-300 ${
                      isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    } origin-left`}></span>
                  </span>
                </AnimatedTooltip>
              </motion.a>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <ThemeToggle />
            </motion.div>
            
            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring dark:focus:ring-blue-500/70"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5 transition-transform duration-200 dark:text-white/90" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5 transition-transform duration-200 dark:text-white/90" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <motion.div 
              className="glass shadow-lg mx-4 my-2 p-4 rounded-xl dark:bg-black/80 dark:border-white/5 backdrop-blur-md"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col space-y-3">
                <motion.a 
                  href="#hero" 
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 text-sm font-medium py-2 px-4 hover:bg-primary/10 rounded-lg transition-colors duration-200 dark:text-white/80 dark:hover:bg-primary/20"
                  variants={mobileItemVariants}
                  whileHover={{ x: 5 }}
                >
                  <Home className="w-4 h-4 text-primary/80" />
                  <span>Home</span>
                </motion.a>
                
                {navItems.map((item, index) => (
                  <motion.a 
                    key={item.href}
                    href={item.href} 
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 text-sm font-medium py-2 px-4 hover:bg-primary/10 rounded-lg transition-colors duration-200 dark:hover:bg-primary/20 ${
                      isActive(item.href) 
                        ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90' 
                        : 'dark:text-white/80'
                    }`}
                    variants={mobileItemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-primary/80">{item.icon}</span>
                    <span>{item.label}</span>
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navigation;
