import React, { useState } from 'react';
import { Mail, MapPin, Clock, Github, Linkedin, Twitter, Image, SendHorizontal, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically handle the form submission, e.g., sending the data to a server.
    // For this example, we'll just log the data.
    
    // Reset the form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  return (
    <section id="contact" className="section-container bg-secondary/20 dark:bg-secondary/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Contact Info */}
        <div className="section-transition">
          <h2 className="section-title">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            I'm currently available for freelance work. If you have a project that needs some creative input, please feel free to contact me.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-medium">Email Me</h3>
                <a href="mailto:contact@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                  contact@example.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-medium">Location</h3>
                <p className="text-muted-foreground">
                  Working Remotely Worldwide
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-medium">Working Hours</h3>
                <p className="text-muted-foreground">
                  Mon - Fri: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <h3 className="text-lg font-medium mb-3">Follow Me</h3>
              <div className="flex gap-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                </a>
                <a 
                  href="https://dribbble.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors"
                  aria-label="Dribbble"
                >
                  <Image className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="section-transition flex flex-col">
          <form onSubmit={handleSubmit} className="glass p-8 rounded-xl relative overflow-hidden border border-white/10 dark:border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
            
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-input bg-background transition-all duration-200 hover:border-primary focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-input bg-background transition-all duration-200 hover:border-primary focus:border-primary"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-input bg-background transition-all duration-200 hover:border-primary focus:border-primary"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 rounded-md border border-input bg-background resize-none transition-all duration-200 hover:border-primary focus:border-primary"
                required
              ></textarea>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button type="submit" className="w-full sm:w-auto group transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                Send Message
                <SendHorizontal className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <a 
                href="/order" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium transition-all duration-200 ease-out-expo hover:bg-secondary/80 group"
              >
                Order Services
                <ShoppingCart className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
