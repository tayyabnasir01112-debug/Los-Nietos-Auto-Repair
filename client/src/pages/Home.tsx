import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Car, Wrench, ShieldCheck, Clock, MapPin, Phone, 
  ArrowRight, CheckCircle2, Star, CalendarDays 
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ServiceCalculator } from "@/components/ServiceCalculator";
import { ContactForm } from "@/components/ContactForm";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

// Static placeholders for background/hero images
const HERO_BG = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2832&auto=format&fit=crop"; /* mechanic working on car underbody */
const ABOUT_IMG = "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2940&auto=format&fit=crop"; /* clean modern garage interior */

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" /> {/* Tint */}
          {/* Using Unsplash for hero background */}
          <img 
            src={HERO_BG} 
            alt="Garage Workshop" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Hero Content */}
        <div className="container relative z-20 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary mb-6 backdrop-blur-sm">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-bold uppercase tracking-widest">Santa Fe Springs' Top Rated</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase tracking-tighter leading-[0.9] mb-4">
                Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-600">Auto</span><br/> 
                <span className="text-white/90">Performance</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Trusted by the community for over 27 years. We combine old-school craftsmanship with modern diagnostics to keep your vehicle running at its peak.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white font-heading text-lg px-8 py-6 rounded-sm uppercase tracking-wider skew-x-[-10deg] shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="skew-x-[10deg] flex items-center gap-2">Book Appointment <ArrowRight className="w-5 h-5" /></span>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/5 border-white/20 hover:bg-white/10 hover:border-white text-white font-heading text-lg px-8 py-6 rounded-sm uppercase tracking-wider skew-x-[-10deg] backdrop-blur-sm"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="skew-x-[10deg]">Explore Services</span>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary/0 via-primary to-primary/0" />
        </motion.div>
      </section>

      {/* STATS STRIP */}
      <div className="border-y border-white/5 bg-secondary/30 backdrop-blur-md relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
            {[
              { label: "Years Experience", value: "27+", icon: Clock },
              { label: "Vehicles Serviced", value: "15k+", icon: Car },
              { label: "Warranty", value: "2 Yrs", icon: ShieldCheck },
              { label: "Certified Techs", value: "100%", icon: Wrench },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <stat.icon className="w-6 h-6 text-primary mb-1" />
                <span className="text-3xl font-heading font-bold text-white">{stat.value}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICES CALCULATOR SECTION */}
      <section id="services" className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
            <div className="max-w-xl">
              <h2 className="text-primary font-bold uppercase tracking-widest mb-2">Our Expertise</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6">Transparent Pricing.<br/>No Surprises.</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Select the services you need below to get an instant estimate. We believe in complete transparency before we ever touch your vehicle.
              </p>
            </div>
          </div>

          <ServiceCalculator />
        </div>
      </section>

      {/* SPECIAL OFFERS */}
      <section className="py-24 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Current Specials</h2>
            <p className="text-muted-foreground">Limited time offers for our valued customers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background border border-border p-8 rounded-xl relative overflow-hidden group hover:border-primary/50 transition-all">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">NEW CUSTOMER</div>
              <h3 className="text-2xl font-heading font-bold mb-2">Free Diagnostic</h3>
              <p className="text-muted-foreground mb-6">With any repair service over $150. Get to the root of the problem without the fee.</p>
              <div className="text-4xl font-heading font-bold text-primary mb-6">$0 <span className="text-sm text-muted-foreground font-normal line-through ml-2">$95</span></div>
              <Button className="w-full bg-white/5 hover:bg-primary hover:text-white border border-white/10" variant="outline">Claim Offer</Button>
            </div>

            <div className="bg-gradient-to-br from-primary to-red-800 p-8 rounded-xl relative overflow-hidden text-white shadow-2xl shadow-primary/20 transform md:-translate-y-4">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <h3 className="text-2xl font-heading font-bold mb-2">Oil Change Special</h3>
              <p className="text-white/80 mb-6">Full synthetic oil change up to 5 quarts + premium filter + 21-point inspection.</p>
              <div className="text-4xl font-heading font-bold mb-6">$59.99</div>
              <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold">Claim Offer</Button>
            </div>

            <div className="bg-background border border-border p-8 rounded-xl relative overflow-hidden group hover:border-primary/50 transition-all">
              <h3 className="text-2xl font-heading font-bold mb-2">Brake Service</h3>
              <p className="text-muted-foreground mb-6">$25 off per axle on brake pad and rotor replacement services.</p>
              <div className="text-4xl font-heading font-bold text-primary mb-6">-$25 <span className="text-sm text-muted-foreground font-normal">/ Axle</span></div>
              <Button className="w-full bg-white/5 hover:bg-primary hover:text-white border border-white/10" variant="outline">Claim Offer</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / GRID */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-primary/20 rounded-2xl rotate-3 blur-sm" />
              <img 
                src={ABOUT_IMG} 
                alt="Our Workshop" 
                className="relative rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500 w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-8 -right-8 bg-secondary p-6 rounded-lg border border-white/10 shadow-xl max-w-[200px] hidden md:block">
                <p className="font-heading text-4xl font-bold text-primary mb-1">27+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">Years serving Santa Fe Springs</p>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h2 className="text-primary font-bold uppercase tracking-widest mb-2">Why Choose Us</h2>
                <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6">Modern Tech.<br/>Classic Service.</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We're not just mechanics; we're automotive enthusiasts who care about your car as much as you do. Our shop is equipped with the latest diagnostic tools to handle everything from classic muscle cars to modern hybrids.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "ASE Certified Master Technicians",
                  "2-Year / 24,000 Mile Warranty",
                  "Digital Inspections sent to your phone",
                  "Complimentary Shuttle Service",
                  "Financing Available"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Button className="bg-transparent hover:bg-primary/10 text-primary border border-primary/50 font-heading uppercase tracking-wide px-8">
                Read Our Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" className="py-24 bg-secondary/30 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-primary font-bold uppercase tracking-widest mb-2">Testimonials</h2>
              <h3 className="text-4xl font-heading font-bold">What Drivers Are Saying</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="font-bold text-lg">4.9/5</span>
              <span className="text-muted-foreground text-sm">(500+ Reviews)</span>
            </div>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* BOOKING / CONTACT */}
      <section id="booking" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-primary font-bold uppercase tracking-widest mb-2">Contact Us</h2>
                <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6">Ready to Schedule?</h3>
                <p className="text-muted-foreground text-lg">
                  Fill out the form to request an appointment, or use the online scheduler below. 
                  We'll confirm your time slot as soon as possible.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 bg-secondary rounded-lg border border-white/5">
                  <Phone className="w-6 h-6 text-primary mb-4" />
                  <h4 className="font-heading font-bold text-lg mb-1">Call Us</h4>
                  <a href="tel:5551234567" className="text-muted-foreground hover:text-white transition-colors">555-123-4567</a>
                </div>
                <div className="p-6 bg-secondary rounded-lg border border-white/5">
                  <MapPin className="w-6 h-6 text-primary mb-4" />
                  <h4 className="font-heading font-bold text-lg mb-1">Visit Us</h4>
                  <p className="text-muted-foreground">123 Auto Row,<br/>Santa Fe Springs, CA</p>
                </div>
                <div className="p-6 bg-secondary rounded-lg border border-white/5 sm:col-span-2">
                  <CalendarDays className="w-6 h-6 text-primary mb-4" />
                  <h4 className="font-heading font-bold text-lg mb-1">Hours</h4>
                  <div className="grid grid-cols-2 text-sm text-muted-foreground">
                    <span>Mon - Fri:</span>
                    <span className="text-right">7:30 AM - 6:00 PM</span>
                    <span>Saturday:</span>
                    <span className="text-right">8:00 AM - 4:00 PM</span>
                    <span>Sunday:</span>
                    <span className="text-right">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary p-8 rounded-xl border border-white/10 shadow-2xl">
              <h3 className="text-2xl font-heading font-bold mb-6">Request Appointment</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 bg-background border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "Do you offer a warranty on repairs?", a: "Yes, we offer a 2-year / 24,000-mile warranty on all parts and labor for qualified repairs." },
              { q: "Can I drop off my car after hours?", a: "Absolutely. We have a secure key drop box located near the front entrance for early bird or late night drop-offs." },
              { q: "Do you offer financing?", a: "We partner with several financing providers to offer flexible payment plans for major repairs. Ask our service advisor for details." },
              { q: "How long does a diagnostic take?", a: "Most diagnostic services are completed within 2-4 hours. We'll provide a detailed report before proceeding with any work." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="hover:text-primary transition-colors text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-secondary pt-24 pb-12 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-br-lg rounded-tl-lg flex items-center justify-center">
                  <span className="text-white font-heading font-bold">AP</span>
                </div>
                <span className="font-heading font-bold text-xl">AUTOPRO</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Premier automotive repair and maintenance in Santa Fe Springs. Trusted, certified, and dedicated to excellence.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-lg mb-6 text-white">Services</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Brake Repair</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Engine Diagnostics</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Oil Changes</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Transmission</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">AC Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#reviews" className="hover:text-primary transition-colors">Reviews</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg mb-6 text-white">Location</h4>
              <div className="rounded-lg overflow-hidden h-32 w-full bg-muted relative">
                 {/* Google Maps Embed Placeholder - would be an iframe in prod */}
                 <img 
                  src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2831&auto=format&fit=crop" 
                  className="w-full h-full object-cover opacity-50"
                  alt="Map Location"
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                   <Button size="sm" variant="secondary" className="text-xs">Get Directions</Button>
                 </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} AutoPro Automotive. All rights reserved.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                <span className="font-bold text-xs">FB</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                <span className="font-bold text-xs">IG</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                <span className="font-bold text-xs">YT</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
