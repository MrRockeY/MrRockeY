
import { Suspense, lazy, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const OrderForm = lazy(() => import("./pages/OrderForm"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Initialize theme based on user preference or saved settings
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Get the base URL from the environment or use a default
const getBaseUrl = () => {
  // This ensures we use the correct base URL in production (GitHub Pages) and development
  return import.meta.env.BASE_URL || '/';
};

const App = () => {
  useEffect(() => {
    initializeTheme();
    
    // Add smooth scrolling behavior for the entire page
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Pre-load critical images
    const criticalImages = [
      // Add critical image paths here
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    
    // Implement observer for lazy loading images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      lazyImages.forEach(img => {
        const imgEl = img as HTMLImageElement;
        imgEl.src = imgEl.dataset.src || '';
      });
    }
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const baseUrl = getBaseUrl();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={baseUrl}>
          <AnimatePresence mode="wait">
            <div className="transition-colors duration-300 ease-in-out">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/order" element={<OrderForm />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
