
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { title: 'Home', id: 'hero' },
    { title: 'About', id: 'about' },
    { title: 'Projects', id: 'projects' },
    { title: 'Contact', id: 'contact' },
  ];

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4 bg-background/80 backdrop-blur-xl shadow-sm dark:bg-background/70' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <a 
            href="#hero" 
            className="text-xl font-semibold tracking-tighter hover:text-primary transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
          >
            Mr. RockeY
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-10">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm opacity-70 hover:opacity-100 hover:text-primary relative after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.id);
                    }}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              className="focus:outline-none transition-transform duration-200 hover:scale-110"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-background dark:bg-background z-40 transform transition-transform duration-300 ease-out-expo ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col h-full justify-center items-center space-y-10 text-2xl font-medium">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="hover:text-primary transition-colors duration-300 hover:scale-110 transform"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.id);
              }}
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
