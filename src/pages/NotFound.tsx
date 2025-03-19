
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-400/5 blur-3xl" />
      </div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-8xl md:text-9xl font-bold mb-6 text-primary">404</h1>
        <p className="text-xl md:text-2xl font-medium mb-8">Oops! Page not found</p>
        <p className="text-foreground/60 max-w-md mx-auto mb-10">
          The page you are looking for might have been removed, renamed, or is temporarily unavailable.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          <span>Return to Home</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
