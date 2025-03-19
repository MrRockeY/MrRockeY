
import React, { useState } from 'react';
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
import { CheckCircle, CalendarIcon, Upload, AlertCircle } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

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
  };

  // Function to go to previous step
  const prevStep = () => {
    setStep(step - 1);
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
                <FormItem className="space-y-3">
                  <FormLabel>Select a Service</FormLabel>
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
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
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
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
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
                <FormItem>
                  <FormLabel>Project Details</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please describe your project requirements in detail..." 
                      className="min-h-[120px] resize-y transition-all duration-200 hover:border-primary focus:border-primary"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <FormLabel htmlFor="file" className="block">Reference Files (Optional)</FormLabel>
              <div className="flex items-center gap-2 w-full">
                <label 
                  htmlFor="file" 
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer w-full hover:bg-secondary/50 transition-colors duration-200"
                >
                  <Upload size={18} />
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
                <FormItem>
                  <FormLabel>Budget Range (USD)</FormLabel>
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
                    />
                    <div className="text-center font-medium text-xl">${budgetValue}</div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Project Deadline</FormLabel>
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
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange as (date: Date | undefined) => void}
                        disabled={disablePastDates}
                        initialFocus
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
                <FormItem>
                  <FormLabel>Preferred Contact Method</FormLabel>
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
                <FormItem>
                  <FormLabel>Contact Details</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={form.watch("contactMethod") === "email" 
                        ? "youremail@example.com" 
                        : "Your phone number"} 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
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
      <Navigation />
      
      <div className="mt-28 mb-16 flex-grow">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Order Services</h1>
            <p className="mt-3 text-muted-foreground">Fill out the form below to request any service you need</p>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-secondary/50 h-1 rounded-full mb-8">
            <div
              className="bg-primary h-1 rounded-full transition-all duration-300 ease-out-expo"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <Card className="glass backdrop-blur-sm border-opacity-40 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">
                {step === 1 && "Select Service"}
                {step === 2 && "Project Information"}
                {step === 3 && "Budget & Timeline"}
              </CardTitle>
              <CardDescription>
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
                  className="transition-all duration-200 hover:bg-secondary"
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
                  className="transition-all duration-200 hover:bg-primary/90"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="transition-all duration-300 hover:bg-primary/90 group"
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
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderForm;
