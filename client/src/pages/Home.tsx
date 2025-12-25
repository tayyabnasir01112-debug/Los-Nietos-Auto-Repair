import { motion } from "framer-motion";
import { 
  Wrench, 
  ShieldCheck, 
  Clock, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Star,
  Zap,
  CheckCircle2,
  Calendar,
  ArrowRight
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { Service, Testimonial, insertInquirySchema } from "@shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { apiRequest } from "@/lib/queryClient";
import { ServiceCalculator } from "@/components/ServiceCalculator";
import { useServices } from "@/hooks/use-services";
import { useTestimonials } from "@/hooks/use-testimonials";
import logoImg from "@assets/generated_images/modern_automotive_repair_shop_logo.png";
import garageBg from "@assets/generated_images/ultra-modern_garage_interior_background.png";
import { Gift, HelpCircle, Camera } from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const { data: services } = useServices();
  const { data: testimonials } = useTestimonials();

  const form = useForm({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      vehicleDetails: "",
      serviceType: "",
      message: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", api.contact.submit.path, data);
      return response.json();
    },
    onSuccess: () => {
      toast({ 
        title: "Request Submitted!", 
        description: "We'll get back to you shortly to confirm your appointment.",
        variant: "default"
      });
      form.reset();
    },
    onError: (error: any) => {
      console.error("Form submission error:", error);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to submit request. Please try again or call us at (562) 692-4245",
        variant: "destructive"
      });
    }
  });

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-all" />
            <img src={logoImg} alt="Los Nietos Logo" className="h-10 w-auto relative z-10 filter brightness-110 contrast-125 group-hover:scale-105 transition-transform" />
          </div>
          <span className="text-xl font-black tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary">LOS NIETOS</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: "Services", id: "services" },
            { name: "About", id: "about" },
            { name: "Reviews", id: "reviews" },
            { name: "Contact", id: "contact" }
          ].map((item) => (
            <a 
              key={item.name} 
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="text-sm font-bold hover:text-primary transition-colors uppercase tracking-widest relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
          <Button 
            variant="default" 
            className="font-bold tracking-widest uppercase hover-elevate shadow-lg shadow-primary/20 whitespace-nowrap min-w-0 px-4 text-sm"
            onClick={(e) => {
              e.preventDefault();
              const bookingSection = document.getElementById('booking');
              if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            Book Appointment
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `linear-gradient(rgba(7, 10, 15, 0.6), rgba(7, 10, 15, 0.95)), url(${garageBg})` }}
        />
        <div className="container relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary">Precision Automotive Engineering</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black mb-8 leading-[0.85] uppercase tracking-tighter">
              Honest Repairs.<br/>
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-primary text-glow animate-gradient-x">Expert Service.</span>
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground text-xl mb-12 leading-relaxed">
              Family-owned for <span className="text-white font-bold">27+ years</span>. Santa Fe Springs' most trusted father-son team specialized in high-performance restoration and maintenance.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="h-16 px-6 md:px-12 text-lg font-black tracking-widest uppercase hover-elevate shadow-xl shadow-primary/25 group min-w-0 whitespace-nowrap"
                onClick={(e) => {
                  e.preventDefault();
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  GET A FREE QUOTE
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
                </span>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-16 px-6 md:px-12 text-lg font-black tracking-widest uppercase glass-panel hover:bg-white/5 transition-colors min-w-0 whitespace-nowrap"
                onClick={(e) => {
                  e.preventDefault();
                  const gallerySection = document.getElementById('gallery');
                  if (gallerySection) {
                    gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                VIEW OUR WORK
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Animated Background Accents */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
      </section>

      {/* Stats Strip */}
      <div className="relative z-20 -mt-10 mb-20">
        <div className="container px-6">
          <div className="glass-panel py-12 px-8 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5 border-primary/10">
            {[
              { label: "Years Experience", val: "27+" },
              { label: "Vehicles Repaired", val: "15k+" },
              { label: "Satisfaction Rate", val: "100%" },
              { label: "Certified Techs", val: "2" },
            ].map((stat, i) => (
              <div key={i} className="text-center px-4 first:divide-none">
                <div className="text-5xl font-black text-primary mb-2 tracking-tighter text-glow">{stat.val}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Calculator Section */}
      <section id="services" className="py-32 relative container px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="text-primary font-black tracking-[0.4em] uppercase text-xs mb-4 block">Transparent Pricing</span>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight uppercase tracking-tighter">Instant<br/>Cost Estimate</h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-lg">
              No hidden fees. No guesswork. Select the services you need to get an immediate estimate of your billing. We believe in complete transparency before we touch your vehicle.
            </p>
            <div className="space-y-4">
              {["Diagnostic report sent to your phone", "Parts & Labor 12-month warranty", "OEM quality parts guaranteed"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full" />
            <ServiceCalculator />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 container px-6 bg-secondary/5 border-y border-white/5">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">World-Class Solutions</h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services?.map((service) => (
            <Card key={service.id} className="glass-panel hover-elevate group transition-all duration-500 overflow-hidden border-white/5 hover:border-primary/20">
              <CardContent className="p-10 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full group-hover:bg-primary/10 transition-colors" />
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary transition-all group-hover:rotate-6">
                  <Zap className="w-8 h-8 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{service.name}</h3>
                <p className="text-muted-foreground text-base mb-8 leading-relaxed">
                  {service.description || "Expert maintenance and repair service tailored to your vehicle's specific needs."}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-xs font-black text-primary tracking-[0.3em] uppercase">Starting at ${service.priceMin}</span>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 container px-6 overflow-hidden relative">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div className="relative order-2 md:order-1">
             <div className="relative z-10 aspect-[4/5] glass-panel rounded-3xl overflow-hidden group">
                <img src={garageBg} alt="Garage" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
             </div>
             <div className="absolute -bottom-12 -right-12 glass-panel p-10 rounded-3xl z-20 border-primary/20 shadow-2xl animate-bounce-slow">
                <div className="text-7xl font-black text-primary mb-1 tracking-tighter">27+</div>
                <div className="text-xs font-black uppercase tracking-[0.4em] text-white">Years of Legacy</div>
             </div>
             <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
          </div>
          <div className="order-1 md:order-2">
            <span className="text-primary font-black tracking-[0.4em] uppercase text-xs mb-6 block">Legacy & Tradition</span>
            <h2 className="text-5xl md:text-8xl font-black mb-10 leading-[0.85] uppercase tracking-tighter">Built on<br/>Honesty.</h2>
            <p className="text-muted-foreground text-xl mb-12 leading-relaxed">
              For nearly three decades, Los Nietos Auto Repair has defined automotive excellence in Santa Fe Springs. Our father-son dynamic combines <span className="text-white font-bold">27 years of deep-rooted mechanical intuition</span> with cutting-edge digital diagnostics.
            </p>
            <div className="grid grid-cols-2 gap-8">
               {[
                 { label: "Technology", val: "Modern" },
                 { label: "Parts", val: "OEM Only" },
                 { label: "Warranty", val: "Lifetime*" },
                 { label: "Service", val: "White Glove" }
               ].map((item, i) => (
                 <div key={i} className="space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{item.label}</div>
                    <div className="text-lg font-black uppercase tracking-widest text-white">{item.val}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 container px-6 bg-secondary/5 border-y border-white/5">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <Camera className="w-8 h-8 text-primary" />
            <span className="text-primary font-black tracking-[0.4em] uppercase text-xs">Our Facility</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Shop Gallery</h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
            Take a virtual tour of our state-of-the-art facility and see where the magic happens
          </p>
        </div>
        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {[
              { src: garageBg, alt: "Modern garage interior with professional equipment" },
              { src: garageBg, alt: "Automotive repair bay with specialized tools" },
              { src: garageBg, alt: "Vehicle service area showing our workspace" },
              { src: garageBg, alt: "Customer waiting area and reception" },
            ].map((img, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="glass-panel border-white/5 overflow-hidden group hover-elevate transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={img.src} 
                      alt={img.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 border-white/10 bg-secondary/80 hover:bg-secondary hover:border-primary" />
          <CarouselNext className="right-4 border-white/10 bg-secondary/80 hover:bg-secondary hover:border-primary" />
        </Carousel>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-40 container px-6">
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-7xl font-black mb-4 uppercase tracking-tighter">The Word<br/>On The Street</h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials && testimonials.length > 0 ? (
            testimonials.map((t) => (
              <Card key={t.id} className="glass-panel p-10 hover-elevate transition-all duration-500 border-white/5 relative group">
                <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-700" />
                <div className="flex gap-1.5 mb-8">
                  {[...Array(t.rating || 5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary text-primary drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]" />)}
                </div>
                <p className="italic text-muted-foreground text-lg mb-10 leading-relaxed group-hover:text-white transition-colors">"{t.text}"</p>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-black text-primary text-xs uppercase">{t.name.charAt(0)}</div>
                   <div className="font-black uppercase tracking-[0.2em] text-sm text-white">{t.name}</div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-20">
              <p className="text-muted-foreground text-lg">Loading testimonials...</p>
            </div>
          )}
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-32 container px-6 bg-secondary/5 border-y border-white/5">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Special Offers</h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Free Diagnostic", desc: "Complimentary check engine light scan with any service", icon: Gift, color: "from-primary to-red-600" },
            { title: "Senior Discount", desc: "10% off all services for customers 65+", icon: Gift, color: "from-red-600 to-primary" },
            { title: "Referral Bonus", desc: "Get $50 credit when you refer a friend", icon: Gift, color: "from-primary to-red-600" },
          ].map((offer, i) => (
            <Card key={i} className="glass-panel p-8 hover-elevate group border-white/5 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-all">
                  <offer.icon className="w-8 h-8 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{offer.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{offer.desc}</p>
                <Button className="mt-6 w-full font-bold tracking-widest uppercase" variant="outline">
                  Claim Offer
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-40 container px-6">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
            <span className="text-primary font-black tracking-[0.4em] uppercase text-xs">Frequently Asked</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black mb-4 uppercase tracking-tighter">Questions?</h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: "What types of vehicles do you service?", a: "We service all makes and models, from domestic to import vehicles, including luxury and performance vehicles. Our team has experience with everything from routine maintenance to complex engine repairs." },
              { q: "Do you offer warranties on your work?", a: "Yes! All our work comes with a 12-month warranty on parts and labor. We use OEM-quality parts and stand behind every repair we make." },
              { q: "How long do most repairs take?", a: "Simple services like oil changes take about 30 minutes. Most repairs are completed within 1-2 business days. We'll provide you with an accurate timeline when we diagnose your vehicle." },
              { q: "Do you offer loaner vehicles?", a: "While we don't have a formal loaner program, we can help arrange transportation for longer repairs. We also offer shuttle service within a 5-mile radius of our shop." },
              { q: "What forms of payment do you accept?", a: "We accept all major credit cards, debit cards, cash, and checks. We also offer financing options through third-party providers for larger repairs." },
              { q: "Do I need an appointment?", a: "Walk-ins are welcome for basic services, but appointments are recommended to ensure we can accommodate you at your preferred time. You can book online or call us at (562) 692-4245." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="glass-panel border-white/5 px-6 rounded-xl hover-elevate transition-all">
                <AccordionTrigger className="font-black uppercase tracking-wider text-left hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Online Booking Section */}
      <section id="booking" className="py-32 container px-6 bg-secondary/10 border-y border-white/5">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-7xl font-black mb-4 uppercase tracking-tighter">Book Your<br/>Appointment</h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Schedule your service online 24/7. Fill out the form below and we'll contact you to confirm your appointment.
          </p>
        </div>
        <Card className="glass-panel border-white/5 p-12 rounded-2xl max-w-4xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => {
              // Add booking flag to the data
              const bookingData = { ...data, message: `[BOOKING REQUEST]\n\n${data.message || 'Appointment request'}` };
              mutation.mutate(bookingData);
            })} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-[0.3em] text-[10px] font-black text-primary">Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary transition-all" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-[0.3em] text-[10px] font-black text-primary">Phone Number *</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="(562) 692-4245" {...field} className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary transition-all" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase tracking-[0.3em] text-[10px] font-black text-primary">Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary transition-all" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="vehicleDetails" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-[0.3em] text-[10px] font-black text-primary">Vehicle (Year/Make/Model) *</FormLabel>
                    <FormControl>
                      <Input placeholder="2018 Toyota Camry" {...field} className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary transition-all" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="serviceType" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-[0.3em] text-[10px] font-black text-primary">Service Needed *</FormLabel>
                    <FormControl>
                      <Input placeholder="Oil Change, Brake Service, etc." {...field} className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary transition-all" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase tracking-[0.3em] text-[10px] font-black text-primary">Preferred Date/Time & Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="Please specify your preferred date and time, or any special requirements..." {...field} className="bg-white/5 border-white/10 rounded-xl focus:border-primary transition-all" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button 
                type="submit" 
                className="w-full h-14 font-black tracking-[0.3em] uppercase text-lg hover-elevate shadow-2xl shadow-primary/20 min-w-0 whitespace-nowrap px-4" 
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <span className="flex items-center justify-center gap-2 overflow-hidden">
                    <Calendar className="w-5 h-5 animate-pulse shrink-0" />
                    <span className="truncate">Submitting Request...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2 overflow-hidden">
                    <Calendar className="w-5 h-5 shrink-0" />
                    <span className="truncate">Request Appointment</span>
                  </span>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                We'll contact you within 24 hours to confirm your appointment. For immediate assistance, call us at <a href="tel:5626924245" className="text-primary hover:underline font-bold">(562) 692-4245</a>
              </p>
            </form>
          </Form>
        </Card>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 bg-secondary/30 relative border-t border-white/5">
        <div className="container px-6 grid lg:grid-cols-2 gap-32">
          <div>
            <h2 className="text-6xl md:text-8xl font-black mb-16 uppercase tracking-tighter leading-none">Ready to<br/><span className="text-primary text-glow">Ignite?</span></h2>
            <div className="space-y-12">
              <div className="flex gap-8 group">
                <div className="w-20 h-20 rounded-3xl glass-panel flex items-center justify-center shrink-0 border-white/5 group-hover:border-primary/40 transition-all duration-500">
                  <MapPin className="text-primary w-8 h-8 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-[0.3em] text-xs mb-3 text-primary">Headquarters</h4>
                  <p className="text-2xl font-black tracking-tight uppercase">11731 Los Nietos Rd,<br/>Santa Fe Springs, CA 90670</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="w-20 h-20 rounded-3xl glass-panel flex items-center justify-center shrink-0 border-white/5 group-hover:border-primary/40 transition-all duration-500">
                  <Phone className="text-primary w-8 h-8 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-[0.3em] text-xs mb-3 text-primary">Direct Line</h4>
                  <p className="text-2xl font-black tracking-tight uppercase">(562) 692-4245</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="w-20 h-20 rounded-3xl glass-panel flex items-center justify-center shrink-0 border-white/5 group-hover:border-primary/40 transition-all duration-500">
                  <Clock className="text-primary w-8 h-8 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-[0.3em] text-xs mb-3 text-primary">Operating Hours</h4>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                    <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Mon - Fri</span>
                    <span className="text-sm font-black uppercase tracking-widest">8AM - 6PM</span>
                    <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Sat</span>
                    <span className="text-sm font-black uppercase tracking-widest">8AM - 3PM</span>
                    <span className="text-sm font-bold uppercase tracking-widest text-primary">Sun</span>
                    <span className="text-sm font-black uppercase tracking-widest text-primary">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-red-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />
            <Card className="glass-panel p-12 rounded-[2.5rem] border-white/5 relative z-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-10">
                  <div className="grid md:grid-cols-2 gap-10">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem><FormLabel className="uppercase tracking-[0.3em] text-[10px] font-black text-primary">Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} className="h-14 bg-white/5 border-white/10 rounded-xl focus:border-primary transition-all text-lg font-bold" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel className="uppercase tracking-[0.3em] text-[10px] font-black text-primary">Phone Number</FormLabel><FormControl><Input type="tel" placeholder="(562) 692-4245" {...field} className="h-14 bg-white/5 border-white/10 rounded-xl focus:border-primary transition-all text-lg font-bold" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel className="uppercase tracking-[0.3em] text-[10px] font-black text-primary">Email Address</FormLabel><FormControl><Input type="email" placeholder="john@example.com" {...field} className="h-14 bg-white/5 border-white/10 rounded-xl focus:border-primary transition-all text-lg font-bold" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid md:grid-cols-2 gap-10">
                    <FormField control={form.control} name="vehicleDetails" render={({ field }) => (
                      <FormItem><FormLabel className="uppercase tracking-[0.3em] text-[10px] font-black text-primary">Vehicle (Year/Make/Model)</FormLabel><FormControl><Input placeholder="2018 Toyota Camry" {...field} className="h-14 bg-white/5 border-white/10 rounded-xl focus:border-primary transition-all text-lg font-bold" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="serviceType" render={({ field }) => (
                      <FormItem><FormLabel className="uppercase tracking-[0.3em] text-[10px] font-black text-primary">Service Needed</FormLabel><FormControl><Input placeholder="Oil Change, Brake Service, etc." {...field} className="h-14 bg-white/5 border-white/10 rounded-xl focus:border-primary transition-all text-lg font-bold" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem><FormLabel className="uppercase tracking-[0.3em] text-[10px] font-black text-primary">Message / Additional Details</FormLabel><FormControl><Textarea rows={5} placeholder="Describe your vehicle issues in detail..." {...field} className="bg-white/5 border-white/10 rounded-xl focus:border-primary transition-all text-lg font-bold" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" className="w-full h-16 font-black tracking-[0.3em] uppercase text-xl hover-elevate shadow-2xl shadow-primary/20" disabled={mutation.isPending}>
                    {mutation.isPending ? "Transmitting..." : "Request Quote"}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 container px-6 border-b border-white/5">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">Find Us</h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
        </div>
        <Card className="glass-panel border-white/5 overflow-hidden rounded-2xl">
          <div className="aspect-video w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.1234567890123!2d-118.12345678901234!3d33.98765432109876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDU5JzE1LjYiTiAxMTjCsDA3JzI0LjQiVw!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 text-center bg-black relative">
        <div className="container px-6">
          <div className="mb-12 flex flex-col md:flex-row justify-center items-center gap-12">
             <div className="flex items-center gap-4">
                <img src={logoImg} alt="Logo" className="h-12 w-auto filter brightness-0 invert" />
                <div className="w-px h-10 bg-white/10" />
                <span className="text-sm font-black uppercase tracking-[0.4em] text-white">Est. 1998</span>
             </div>
             <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
               <a href="#" className="hover:text-primary transition-colors">Instagram</a>
               <a href="#" className="hover:text-primary transition-colors">Facebook</a>
               <a href="#" className="hover:text-primary transition-colors">Yelp</a>
             </div>
          </div>
          <div className="text-muted-foreground text-[10px] uppercase tracking-[0.5em] mb-6 max-w-2xl mx-auto leading-loose">
            © 2025 Los Nietos Auto Repair. Engineered for safety & high-performance. All intellectual property remains with the original founders.
          </div>
          <div className="flex justify-center gap-12 text-[10px] font-black uppercase tracking-[0.3em]">
             <a href="#" className="hover:text-primary transition-colors underline underline-offset-8 decoration-white/10 hover:decoration-primary">Privacy Protocol</a>
             <a href="#" className="hover:text-primary transition-colors underline underline-offset-8 decoration-white/10 hover:decoration-primary">Terms of Engagement</a>
          </div>
        </div>
      </footer>
    </div>
  );
}