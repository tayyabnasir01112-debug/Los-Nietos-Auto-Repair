import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Reviews", href: "#reviews" },
    { name: "FAQ", href: "#faq" },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (location !== "/") {
      setLocation("/");
      // Small timeout to allow navigation before scrolling
      setTimeout(() => {
        const element = document.getElementById(id.replace("#", ""));
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(id.replace("#", ""));
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-10 h-10 bg-primary rounded-br-xl rounded-tl-xl flex items-center justify-center transform group-hover:skew-x-12 transition-transform duration-300">
              <span className="text-white font-heading font-bold text-xl">AP</span>
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tighter leading-none text-white">AUTO<span className="text-primary">PRO</span></h1>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase leading-none">Santa Fe Springs</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors uppercase tracking-wide"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:5551234567" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span className="font-heading font-medium tracking-wide">555-123-4567</span>
            </a>
            <Button 
              onClick={() => scrollToSection("#booking")}
              className="bg-primary hover:bg-primary/90 text-white font-heading tracking-wide uppercase rounded-sm skew-x-[-10deg]"
            >
              <span className="skew-x-[10deg] flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Book Now
              </span>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border mt-4"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-lg font-heading font-bold text-foreground hover:text-primary uppercase text-left"
                >
                  {link.name}
                </button>
              ))}
              <div className="h-px bg-border my-2" />
              <a href="tel:5551234567" className="flex items-center gap-2 text-xl font-heading text-primary">
                <Phone className="w-5 h-5" />
                555-123-4567
              </a>
              <Button 
                onClick={() => scrollToSection("#booking")}
                className="w-full bg-primary hover:bg-primary/90 text-white font-heading text-lg py-6 uppercase rounded-sm"
              >
                Book Appointment
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
