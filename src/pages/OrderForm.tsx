
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { 
  Calendar, 
  Upload, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  FileText,
  Send
} from 'lucide-react';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  RadioGroup,
  RadioGroupItem
} from '@/components/ui/radio-group';
import { 
  Checkbox 
} from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

// Define form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  service: z.string({
    required_error: "Please select a service.",
  }),
  projectDetails: z.string().min(30, { 
    message: "Please provide at least 30 characters of project details." 
  }),
  budget: z.array(z.number()).refine((value) => value.length === 1, {
    message: "Please select a budget range.",
  }),
  deadline: z.date({
    required_error: "Please select a deadline.",
  }),
  contactMethod: z.enum(["email", "whatsapp", "both"], {
    required_error: "Please select a preferred contact method.",
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const services = [
  { value: "web-development", label: "Web Development" },
  { value: "excel-automation", label: "Excel Automation" },
  { value: "youtube-thumbnails", label: "YouTube Thumbnails" },
  { value: "graphic-design", label: "Graphic Design" },
  { value: "seo-services", label: "SEO Services" },
  { value: "content-writing", label: "Content Writing" },
];

const OrderForm = () => {
  const [step, setStep] = useState(1);
  const [fileUploaded, setFileUploaded] = useState(false);
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      projectDetails: "",
      budget: [500],
      contactMethod: "email",
      termsAccepted: false,
    },
  });

  const watchService = form.watch("service");

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    
    // Show success message
    toast.success("Your order has been submitted!", {
      description: "We'll get back to you shortly.",
      duration: 5000,
    });
    
    // Reset form
    form.reset();
    setStep(1);
    setFileUploaded(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="section-container pt-24 pb-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="section-title text-center mb-8">Request My Services</h1>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Fill out the form below to request my services. I'll get back to you as soon as possible with a custom quote.
          </p>
          
          <Card className="glass transition-all duration-300 hover:shadow-xl dark:hover:shadow-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-gradient">Order Form</span>
                {step === 1 && <Clock className="h-5 w-5 text-muted-foreground animate-pulse" />}
                {step === 2 && <DollarSign className="h-5 w-5 text-muted-foreground animate-pulse" />}
                {step === 3 && <FileText className="h-5 w-5 text-muted-foreground animate-pulse" />}
              </CardTitle>
              <CardDescription>
                Step {step} of 3: {step === 1 ? "Basic Info" : step === 2 ? "Project Details" : "Finalize Order"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-4 fade-in">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                {...field}
                                className="transition-all duration-200 hover:border-primary focus:border-primary" 
                              />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="your.email@example.com" 
                                type="email" 
                                {...field}
                                className="transition-all duration-200 hover:border-primary focus:border-primary" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="transition-all duration-200 hover:border-primary focus:border-primary">
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Services</SelectLabel>
                                  {services.map((service) => (
                                    <SelectItem 
                                      key={service.value} 
                                      value={service.value}
                                      className="cursor-pointer transition-colors hover:bg-primary/10"
                                    >
                                      {service.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="button" 
                        onClick={() => watchService ? setStep(2) : null}
                        disabled={!watchService}
                        className="w-full mt-6 group transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10"
                      >
                        Next Step
                        <svg 
                          className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Button>
                    </div>
                  )}
                  
                  {step === 2 && (
                    <div className="space-y-4 fade-in">
                      <FormField
                        control={form.control}
                        name="projectDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Details</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your project requirements in detail..." 
                                className="min-h-[120px] transition-all duration-200 hover:border-primary focus:border-primary"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              {watchService === "web-development" && "Include pages, features, and any specific technologies you prefer."}
                              {watchService === "excel-automation" && "Describe the Excel tasks you want to automate."}
                              {watchService === "youtube-thumbnails" && "Describe the style and content of thumbnails you need."}
                              {watchService === "graphic-design" && "Describe the graphics you need and their purpose."}
                              {watchService === "seo-services" && "What are your SEO goals and current website status?"}
                              {watchService === "content-writing" && "What type of content do you need and for which audience?"}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Budget Range (USD)</FormLabel>
                            <FormControl>
                              <div className="space-y-4">
                                <Slider
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  max={5000}
                                  min={100}
                                  step={100}
                                  className="py-4"
                                />
                                <div className="text-center font-medium">
                                  ${field.value}
                                </div>
                              </div>
                            </FormControl>
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
                                      "w-full pl-3 text-left font-normal transition-all duration-200 hover:border-primary focus:border-primary",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a deadline</span>
                                    )}
                                    <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date(new Date().setDate(new Date().getDate() + 1))
                                  }
                                  initialFocus
                                  className={cn("p-3 pointer-events-auto")}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Select the date by when you need this project completed.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-between gap-4 mt-6">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setStep(1)}
                          className="flex-1 transition-all duration-200 hover:bg-secondary/80"
                        >
                          Back
                        </Button>
                        <Button 
                          type="button" 
                          onClick={() => {
                            const projectDetails = form.getValues("projectDetails");
                            const budget = form.getValues("budget");
                            const deadline = form.getValues("deadline");
                            
                            if (projectDetails && projectDetails.length >= 30 && budget && budget.length > 0 && deadline) {
                              setStep(3);
                            } else {
                              form.trigger(["projectDetails", "budget", "deadline"]);
                            }
                          }}
                          className="flex-1 group transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10"
                        >
                          Next Step
                          <svg 
                            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {step === 3 && (
                    <div className="space-y-4 fade-in">
                      <div className="p-4 rounded-md bg-secondary/50 mb-6">
                        <h3 className="text-lg font-medium mb-2">Order Summary</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Service:</span>
                            <span className="font-medium">
                              {services.find(s => s.value === form.getValues("service"))?.label}
                            </span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Budget:</span>
                            <span className="font-medium">${form.getValues("budget")}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Deadline:</span>
                            <span className="font-medium">
                              {form.getValues("deadline") ? format(form.getValues("deadline"), "PPP") : "Not set"}
                            </span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 rounded-md border border-dashed transition-all hover:border-primary cursor-pointer">
                        <div className="flex items-center justify-center flex-col gap-2">
                          <Upload className={cn(
                            "h-8 w-8 transition-all", 
                            fileUploaded ? "text-green-500" : "text-muted-foreground"
                          )} />
                          <p className="text-center text-sm">
                            {fileUploaded ? (
                              <span className="text-green-500 flex items-center gap-1">
                                <CheckCircle2 className="h-4 w-4" /> File uploaded successfully
                              </span>
                            ) : (
                              "Drag & drop reference files here or click to browse"
                            )}
                          </p>
                          <input 
                            type="file" 
                            className="hidden" 
                            id="file-upload"
                            onChange={() => setFileUploaded(true)}
                          />
                          <label 
                            htmlFor="file-upload" 
                            className="text-xs text-primary hover:underline cursor-pointer"
                          >
                            {fileUploaded ? "Change file" : "Select file"}
                          </label>
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="contactMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Preferred Contact Method</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="email" className="transition-all duration-200 hover:border-primary" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Email
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="whatsapp" className="transition-all duration-200 hover:border-primary" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    WhatsApp
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="both" className="transition-all duration-200 hover:border-primary" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Both
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="termsAccepted"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="transition-all duration-200 hover:border-primary data-[state=checked]:border-primary"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-normal cursor-pointer">
                                I accept the <a href="#" className="text-primary hover:underline">terms and conditions</a>
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-between gap-4 mt-6">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setStep(2)}
                          className="flex-1 transition-all duration-200 hover:bg-secondary/80"
                        >
                          Back
                        </Button>
                        <Button 
                          type="submit"
                          className="flex-1 group transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10 flex items-center gap-2"
                        >
                          <span>Submit Order</span>
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderForm;
