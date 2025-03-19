
import React, { useState, useRef, useEffect } from 'react';
import { Send, Github, Linkedin, Twitter } from 'lucide-react';
import AnimatedText from './AnimatedText';
import { toast } from "@/components/ui/use-toast";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: <Github className="w-5 h-5" />, 
      url: 'https://github.com/username' 
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin className="w-5 h-5" />, 
      url: 'https://linkedin.com/in/username' 
    },
    { 
      name: 'Twitter', 
      icon: <Twitter className="w-5 h-5" />, 
      url: 'https://twitter.com/username' 
    },
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 md:py-32 relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -right-[30%] w-[80%] h-[80%] rounded-full bg-primary/5 blur-3xl" />
      </div>
      
      <div className="section-container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary mb-6">
              Let's Connect
            </div>
            
            <AnimatedText 
              text="Get in touch with me" 
              className="text-3xl md:text-4xl font-semibold mb-6 mx-auto"
              once
              delay={isVisible ? 0 : 0}
            />
            
            <p className={`text-foreground/60 max-w-2xl mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you! Fill out the form below, and I'll get back to you as soon as possible.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    placeholder="I'd like to discuss a project..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center justify-center w-full px-6 py-3.5 bg-primary text-white rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-70 ${
                    isSubmitting ? 'cursor-not-allowed' : 'hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="animate-pulse">Sending...</div>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Contact Info & Social Links */}
            <div className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '400ms' }}>
              <div className="glass p-8 rounded-2xl h-full flex flex-col">
                <h3 className="text-xl font-medium mb-6">Contact Information</h3>
                
                <div className="space-y-6 mb-10">
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Email</p>
                    <a href="mailto:contact@example.com" className="link-underline">
                      contact@example.com
                    </a>
                  </div>
                  
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Based in</p>
                    <p>San Francisco, CA</p>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <p className="text-sm text-foreground/60 mb-4">Follow me on</p>
                  <div className="flex space-x-4">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                        aria-label={link.name}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
