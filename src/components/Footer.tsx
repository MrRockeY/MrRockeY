
import React from 'react';
import { ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-foreground/60 text-sm">
              © {currentYear} Mr. RockeY. All rights reserved.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center justify-center p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors duration-200"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
