import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { useTestimonials } from "@/hooks/use-testimonials";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function TestimonialCarousel() {
  const { data: testimonials, isLoading } = useTestimonials();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (isLoading) {
    return <div className="grid md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 w-full bg-secondary/50 rounded-xl" />)}
    </div>;
  }

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {testimonials?.map((testimonial) => (
            <div key={testimonial.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4">
              <div className="h-full bg-secondary p-8 rounded-xl border border-white/5 relative group hover:border-primary/30 transition-colors">
                <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors rotate-180" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < testimonial.rating ? "text-primary fill-primary" : "text-muted"}`} 
                    />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed italic relative z-10">
                  "{testimonial.text}"
                </p>
                
                <div className="mt-auto border-t border-white/5 pt-4">
                  <p className="font-heading font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Verified Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end gap-2 mt-8">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={scrollPrev}
          className="bg-transparent border-white/10 hover:bg-white/5 hover:border-primary hover:text-primary"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={scrollNext}
          className="bg-transparent border-white/10 hover:bg-white/5 hover:border-primary hover:text-primary"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
