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
  Calendar
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
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="Los Nietos Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold tracking-tighter text-glow">LOS NIETOS</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Services", "About", "Reviews", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest">
              {item}
            </a>
          ))}
          <Button variant="default" className="font-bold tracking-widest uppercase">Book Now</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9)), url(${garageBg})` }}
        />
        <div className="container relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold tracking-[0.3em] uppercase mb-4 block text-glow">Precision Automotive Engineering</span>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              Honest Repairs.<br/><span className="text-primary text-glow">Expert Service.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-10">
              Family-owned for 27+ years. Los Nietos Rd's most trusted father-son team specialized in full vehicle restoration and maintenance.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="h-14 px-10 text-lg font-bold">GET A FREE QUOTE</Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold glass-panel">OUR SERVICES</Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-white/5 bg-secondary/30">
        <div className="container px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Years Experience", val: "27+" },
              { label: "Vehicles Repaired", val: "15k+" },
              { label: "Satisfaction Rate", val: "100%" },
              { label: "Expert Techs", val: "2" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-black text-primary mb-2">{stat.val}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 container px-6">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">World-Class Services</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {services?.map((service) => (
            <Card key={service.id} className="glass-panel hover-elevate group transition-all duration-500">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <Zap className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">{service.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {service.description || "Expert maintenance and repair service tailored to your vehicle's specific needs."}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-primary tracking-widest uppercase">Starts at ${service.priceMin}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 container px-6 bg-secondary/10 overflow-hidden relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase mb-4 block">Our Legacy</span>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight uppercase tracking-tighter">A Father-Son<br/>Tradition</h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              For over 27 years, Los Nietos Auto Repair has been a cornerstone of the Santa Fe Springs community. Founded on the principles of honesty and technical excellence, our father-son team brings a personal touch to every repair.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Certified Master Technicians",
                "Advanced Diagnostic Equipment",
                "Transparent Pricing Policy",
                "Genuine OEM Parts Guarantee"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium uppercase tracking-wider">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
             <div className="aspect-square glass-panel rounded-2xl overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-700">
                <img src={garageBg} alt="Garage" className="w-full h-full object-cover scale-110" />
             </div>
             <div className="absolute -bottom-10 -left-10 glass-panel p-8 rounded-2xl hidden md:block">
                <div className="text-5xl font-black text-primary mb-1">27+</div>
                <div className="text-xs uppercase tracking-widest font-bold">Years of Trust</div>
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-32 container px-6">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">Client Reviews</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials?.map((t) => (
            <Card key={t.id} className="glass-panel p-8 hover-elevate transition-all duration-500">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
              </div>
              <p className="italic text-muted-foreground mb-6">"{t.text}"</p>
              <div className="font-black uppercase tracking-widest text-sm">— {t.name}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-secondary/20 relative">
        <div className="container px-6 grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase tracking-tighter">Ready to<br/>Roll?</h2>
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center shrink-0 border-primary/20">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-[0.2em] text-xs mb-2 text-primary">Location</h4>
                  <p className="text-lg font-medium">11731 Los Nietos Rd, Santa Fe Springs, CA 90670</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center shrink-0 border-primary/20">
                  <Phone className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-[0.2em] text-xs mb-2 text-primary">Phone</h4>
                  <p className="text-lg font-medium">(562) 692-4245</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center shrink-0 border-primary/20">
                  <Clock className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-[0.2em] text-xs mb-2 text-primary">Business Hours</h4>
                  <p className="text-sm font-medium uppercase tracking-widest">Mon-Fri 8AM-6PM<br/>Sat 8AM-3PM<br/><span className="text-primary">Sun Closed</span></p>
                </div>
              </div>
            </div>
          </div>

          <Card className="glass-panel p-10 border-primary/10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel className="uppercase tracking-[0.2em] text-[10px] font-black text-primary">Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} className="h-12 bg-white/5 border-white/10 rounded-none focus:border-primary transition-all" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel className="uppercase tracking-[0.2em] text-[10px] font-black text-primary">Email Address</FormLabel><FormControl><Input placeholder="john@example.com" {...field} className="h-12 bg-white/5 border-white/10 rounded-none focus:border-primary transition-all" /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem><FormLabel className="uppercase tracking-[0.2em] text-[10px] font-black text-primary">Service Request</FormLabel><FormControl><Textarea rows={4} placeholder="Tell us about your vehicle issues..." {...field} className="bg-white/5 border-white/10 rounded-none focus:border-primary transition-all" /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full h-14 font-black tracking-[0.2em] uppercase text-lg" disabled={mutation.isPending}>
                  {mutation.isPending ? "Transmitting..." : "Send Request"}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center bg-secondary/40">
        <div className="mb-8 flex justify-center items-center gap-4">
           <img src={logoImg} alt="Logo" className="h-8 w-auto grayscale opacity-50" />
           <div className="w-px h-6 bg-white/10" />
           <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Est. 1998</span>
        </div>
        <div className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] mb-4">
          © 2025 Los Nietos Auto Repair. Engineered for performance & safety.
        </div>
        <div className="flex justify-center gap-8 text-[10px] font-bold uppercase tracking-widest">
           <a href="#" className="hover:text-primary transition-colors">Privacy</a>
           <a href="#" className="hover:text-primary transition-colors">Terms</a>
           <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
        </div>
      </footer>
    </div>
  );
}