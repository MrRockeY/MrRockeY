
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <a 
            href="#hero" 
            className="text-xl font-bold tracking-tighter transition-transform duration-200 hover:scale-105"
          >
            Mr.<span className="text-gradient">RockeY</span>
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#about" 
              className="text-sm font-medium transition-colors duration-200 hover:text-primary"
            >
              About
            </a>
            <a 
              href="#projects" 
              className="text-sm font-medium transition-colors duration-200 hover:text-primary"
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className="text-sm font-medium transition-colors duration-200 hover:text-primary"
            >
              Contact
            </a>
            <a 
              href="/order" 
              className="text-sm font-medium transition-colors duration-200 hover:text-primary"
            >
              Order Services
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
              ) : (
                <Menu className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="glass shadow-lg mx-4 my-2 p-4 rounded-lg">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#about" 
              onClick={closeMobileMenu}
              className="text-sm font-medium py-2 px-4 hover:bg-primary/10 rounded-md transition-colors duration-200"
            >
              About
            </a>
            <a 
              href="#projects" 
              onClick={closeMobileMenu}
              className="text-sm font-medium py-2 px-4 hover:bg-primary/10 rounded-md transition-colors duration-200"
            >
              Projects
            </a>
            <a 
              href="#contact" 
              onClick={closeMobileMenu}
              className="text-sm font-medium py-2 px-4 hover:bg-primary/10 rounded-md transition-colors duration-200"
            >
              Contact
            </a>
            <a 
              href="/order" 
              onClick={closeMobileMenu}
              className="text-sm font-medium py-2 px-4 hover:bg-primary/10 rounded-md transition-colors duration-200"
            >
              Order Services
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
