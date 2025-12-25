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
import { useQuery, useMutation } from "@tanstack/react-query";
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
import { apiRequest } from "@/lib/queryClient";
import { ServiceCalculator } from "@/components/ServiceCalculator";
import logoImg from "@assets/generated_images/modern_automotive_repair_shop_logo.png";
import garageBg from "@assets/generated_images/ultra-modern_garage_interior_background.png";

export default function Home() {
  const { toast } = useToast();
  const { data: services } = useQuery<Service[]>({ queryKey: [api.services.list.path] });
  const { data: testimonials } = useQuery<Testimonial[]>({ queryKey: [api.testimonials.list.path] });

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
    mutationFn: (data: any) => apiRequest("POST", api.contact.submit.path, data),
    onSuccess: () => {
      toast({ title: "Success!", description: "We'll get back to you shortly." });
      form.reset();
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
          {["Services", "About", "Reviews", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold hover:text-primary transition-colors uppercase tracking-widest relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
          <Button variant="default" className="font-bold tracking-widest uppercase hover-elevate shadow-lg shadow-primary/20">Book Appointment</Button>
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
              <Button size="lg" className="h-16 px-12 text-lg font-black tracking-widest uppercase hover-elevate shadow-xl shadow-primary/25 group">
                GET A FREE QUOTE
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-black tracking-widest uppercase glass-panel hover:bg-white/5 transition-colors">
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

      {/* Testimonials */}
      <section id="reviews" className="py-40 container px-6">
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-7xl font-black mb-4 uppercase tracking-tighter">The Word<br/>On The Street</h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials?.map((t) => (
            <Card key={t.id} className="glass-panel p-10 hover-elevate transition-all duration-500 border-white/5 relative group">
              <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-700" />
              <div className="flex gap-1.5 mb-8">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary text-primary drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]" />)}
              </div>
              <p className="italic text-muted-foreground text-lg mb-10 leading-relaxed group-hover:text-white transition-colors">"{t.text}"</p>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-black text-primary text-xs uppercase">{t.name.charAt(0)}</div>
                 <div className="font-black uppercase tracking-[0.2em] text-sm text-white">{t.name}</div>
              </div>
            </Card>
          ))}
        </div>
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
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel className="uppercase tracking-[0.3em] text-[10px] font-black text-primary">Email Address</FormLabel><FormControl><Input placeholder="john@example.com" {...field} className="h-14 bg-white/5 border-white/10 rounded-xl focus:border-primary transition-all text-lg font-bold" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem><FormLabel className="uppercase tracking-[0.3em] text-[10px] font-black text-primary">Technical Request</FormLabel><FormControl><Textarea rows={5} placeholder="Describe your vehicle issues in detail..." {...field} className="bg-white/5 border-white/10 rounded-xl focus:border-primary transition-all text-lg font-bold" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" className="w-full h-16 font-black tracking-[0.3em] uppercase text-xl hover-elevate shadow-2xl shadow-primary/20" disabled={mutation.isPending}>
                    {mutation.isPending ? "Transmitting..." : "Initialize Request"}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
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