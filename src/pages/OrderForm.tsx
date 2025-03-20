
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CheckCircle, CalendarIcon, Upload, AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Define the form schema with Zod
const formSchema = z.object({
  service: z.string().min(1, { message: 'Please select a service' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  projectDetails: z.string().min(10, { message: 'Project details must be at least 10 characters' }),
  deadline: z.date({ required_error: 'Please select a deadline' }),
  budget: z.number().min(0),
  contactMethod: z.string().min(1, { message: 'Please select a contact method' }),
  contactDetail: z.string().min(1, { message: 'Please provide your contact details' }),
});

type FormValues = z.infer<typeof formSchema>;

const OrderForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [budgetValue, setBudgetValue] = useState(500);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: '',
      name: '',
      email: '',
      projectDetails: '',
      deadline: addDays(new Date(), 7),
      budget: 500,
      contactMethod: '',
      contactDetail: '',
    },
  });

  // Setup intersection observer for scroll reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  // Effect for card entrance animation
  useEffect(() => {
    if (cardRef.current) {
      setTimeout(() => {
        cardRef.current?.classList.add('opacity-100', 'translate-y-0');
        cardRef.current?.classList.remove('opacity-0', 'translate-y-8');
      }, 100);
    }
  }, []);

  // Function to handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  // Function to disable past dates
  const disablePastDates = (date: Date) => {
    return date < new Date();
  };

  // Function to scroll to top of form on step change
  const scrollToForm = () => {
    window.scrollTo({
      top: formRef.current?.offsetTop ? formRef.current.offsetTop - 100 : 0,
      behavior: 'smooth',
    });
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log('Form submitted:', data);
      console.log('File:', selectedFile);
      
      // Show success toast
      toast({
        title: "Order Submitted Successfully!",
        description: "We'll contact you shortly to discuss your project.",
        variant: "default",
      });
      
      // Reset form and state
      form.reset();
      setSelectedFile(null);
      setStep(1);
      setBudgetValue(500);
      setIsSubmitting(false);
    }, 1500);
  };

  // Function to go to next step
  const nextStep = () => {
    if (step === 1) {
      const serviceValue = form.getValues('service');
      if (!serviceValue) {
        form.setError('service', {
          type: 'manual',
          message: 'Please select a service to continue',
        });
        return;
      }
    } else if (step === 2) {
      const { name, email, projectDetails } = form.getValues();
      if (!name || !email || !projectDetails) {
        // Set errors for empty fields
        if (!name) form.setError('name', { type: 'manual', message: 'Name is required' });
        if (!email) form.setError('email', { type: 'manual', message: 'Email is required' });
        if (!projectDetails) form.setError('projectDetails', { type: 'manual', message: 'Project details are required' });
        return;
      }
    }
    setStep(step + 1);
    scrollToForm();
  };

  // Function to go to previous step
  const prevStep = () => {
    setStep(step - 1);
    scrollToForm();
  };
  
  // Track progress percentage
  const progressPercentage = (step / 3) * 100;

  // Render different step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem className="space-y-3 transition-all duration-500 hover:scale-[1.01]">
                  <FormLabel className="text-base dark:text-white/90">Select a Service</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web_development">Web Development</SelectItem>
                        <SelectItem value="graphic_design">Graphic Design</SelectItem>
                        <SelectItem value="seo">SEO Optimization</SelectItem>
                        <SelectItem value="excel_automation">Excel Automation</SelectItem>
                        <SelectItem value="youtube_thumbnails">YouTube Thumbnails</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="transition-all duration-300 hover:scale-[1.01]">
                  <FormLabel className="text-base dark:text-white/90">Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="transition-all duration-200 hover:border-primary focus:border-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="transition-all duration-300 hover:scale-[1.01]">
                  <FormLabel className="text-base dark:text-white/90">Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="youremail@example.com" {...field} className="transition-all duration-200 hover:border-primary focus:border-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="projectDetails"
              render={({ field }) => (
                <FormItem className="transition-all duration-300 hover:scale-[1.01]">
                  <FormLabel className="text-base dark:text-white/90">Project Details</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please describe your project requirements in detail..." 
                      className="min-h-[120px] resize-y transition-all duration-200 hover:border-primary focus:border-primary dark:bg-background/80"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2 transition-all duration-300 hover:scale-[1.01]">
              <FormLabel htmlFor="file" className="block text-base dark:text-white/90">Reference Files (Optional)</FormLabel>
              <div className="flex items-center gap-2 w-full">
                <label 
                  htmlFor="file" 
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer w-full hover:bg-secondary/50 transition-colors duration-200 dark:hover:bg-white/5"
                >
                  <Upload size={18} className="text-primary" />
                  <span>{selectedFile ? selectedFile.name : 'Upload Files'}</span>
                </label>
                <Input id="file" type="file" className="hidden" onChange={handleFileChange} />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem className="transition-all duration-300 hover:scale-[1.01]">
                  <FormLabel className="text-base dark:text-white/90">Budget Range (USD)</FormLabel>
                  <div className="space-y-4">
                    <Slider
                      defaultValue={[budgetValue]}
                      max={5000}
                      min={100}
                      step={100}
                      onValueChange={(vals) => {
                        setBudgetValue(vals[0]);
                        field.onChange(vals[0]);
                      }}
                      className="py-4"
                    />
                    <div className="text-center font-medium text-xl dark:text-gradient">${budgetValue}</div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col transition-all duration-300 hover:scale-[1.01]">
                  <FormLabel className="text-base dark:text-white/90">Project Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={disablePastDates}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactMethod"
              render={({ field }) => (
                <FormItem className="transition-all duration-300 hover:scale-[1.01]">
                  <FormLabel className="text-base dark:text-white/90">Preferred Contact Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select contact method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactDetail"
              render={({ field }) => (
                <FormItem className="transition-all duration-300 hover:scale-[1.01]">
                  <FormLabel className="text-base dark:text-white/90">Contact Details</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={form.watch("contactMethod") === "email" 
                        ? "youremail@example.com" 
                        : "Your phone number"} 
                      {...field} 
                      className="dark:bg-background/80"
                    />
                  </FormControl>
                  <FormDescription className="dark:text-white/60">
                    {form.watch("contactMethod") === "whatsapp" && "Please include country code"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-background to-background/80">
      <div className="fixed top-0 w-full z-50 transition-all duration-300 bg-background/80 backdrop-blur-lg shadow-sm dark:bg-black/50 dark:shadow-md dark:shadow-black/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Brand */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="text-xl font-bold tracking-tighter dark:text-white/95 relative group flex items-center">
                <ArrowLeft className="mr-2 h-5 w-5 text-primary dark:text-primary/90" />
                Back to Home
              </Link>
            </motion.div>
            
            {/* Logo/Brand centered */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold tracking-tighter dark:text-white/95"
            >
              Mr.<span className="text-gradient">RockeY</span>
            </motion.div>
            
            {/* Right side actions */}
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link 
                  to="/#contact" 
                  className="btn-secondary text-sm px-4 py-2 rounded-lg hover:bg-secondary/80"
                >
                  Need Help?
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-28 mb-16 flex-grow" ref={formRef}>
        <div className="container px-4 mx-auto max-w-4xl">
          <div className={`text-center mb-10 transition-all duration-700 ease-out-expo ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl dark:text-white/95 dark-text-shadow">Order Services</h1>
            <p className="mt-3 text-muted-foreground dark:text-white/70">Fill out the form below to request any service you need</p>
          </div>
          
          {/* Progress Bar */}
          <div className={`w-full bg-secondary/50 h-1 rounded-full mb-8 overflow-hidden transition-all duration-700 ease-out-expo ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
            <div
              className="bg-primary h-1 rounded-full transition-all duration-500 ease-out-expo"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <Card 
            className="glass backdrop-blur-sm border-opacity-40 shadow-xl opacity-0 translate-y-8 transition-all duration-700 ease-out-expo dark:bg-black/40 dark:border-white/10"
            ref={cardRef}
          >
            <CardHeader>
              <CardTitle className="text-2xl dark:text-white/95 dark-text-shadow">
                {step === 1 && "Select Service"}
                {step === 2 && "Project Information"}
                {step === 3 && "Budget & Timeline"}
              </CardTitle>
              <CardDescription className="dark:text-white/70">
                {step === 1 && "Choose the service you need"}
                {step === 2 && "Tell us about your project"}
                {step === 3 && "Set your budget and timeline"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {renderStepContent()}
                </form>
              </Form>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              {step > 1 ? (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  className="transition-all duration-300 hover:scale-105 hover:bg-secondary dark:hover:bg-white/5 dark:text-white/80 dark:border-white/20"
                >
                  Previous
                </Button>
              ) : (
                <div></div>
              )}
              
              {step < 3 ? (
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="transition-all duration-300 hover:scale-105 hover:bg-primary/90 dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="transition-all duration-300 hover:scale-105 hover:bg-primary/90 group dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-t-2 border-white rounded-full"></span>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Submit Order
                      <CheckCircle 
                        className="ml-1 h-4 w-4 transform transition-transform duration-200 group-hover:scale-110" 
                      />
                    </span>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Pricing Estimation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <h2 className="text-2xl font-semibold mb-6 dark:text-white/90">Service Pricing Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl p-6 bg-white/30 dark:bg-black/30 border border-border dark:border-white/10 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-medium mb-2 dark:text-white/85">Web Development</h3>
                <p className="text-foreground/60 dark:text-white/60 mb-4">Custom websites with modern UI/UX</p>
                <p className="text-xl font-semibold text-primary">From $499</p>
              </div>
              <div className="rounded-xl p-6 bg-white/30 dark:bg-black/30 border border-border dark:border-white/10 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-medium mb-2 dark:text-white/85">Graphic Design</h3>
                <p className="text-foreground/60 dark:text-white/60 mb-4">Logos, posters, and marketing materials</p>
                <p className="text-xl font-semibold text-primary">From $199</p>
              </div>
              <div className="rounded-xl p-6 bg-white/30 dark:bg-black/30 border border-border dark:border-white/10 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-medium mb-2 dark:text-white/85">SEO Optimization</h3>
                <p className="text-foreground/60 dark:text-white/60 mb-4">Improve visibility and search rankings</p>
                <p className="text-xl font-semibold text-primary">From $299</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderForm;
