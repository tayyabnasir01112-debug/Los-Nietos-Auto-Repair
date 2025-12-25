import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

const fallbackTestimonials = [
  { id: 1, name: "Michael Rodriguez", rating: 5, text: "Best shop in Santa Fe Springs. Honest pricing and they actually fixed the issue the first time.", date: new Date() },
  { id: 2, name: "Sarah Jenkins", rating: 5, text: "I was quoted $1200 at the dealership. These guys did it for $750 using genuine parts. Highly recommend.", date: new Date() },
  { id: 3, name: "David Chen", rating: 5, text: "Fast, professional, and clean waiting area. The text updates with photos of the repair were a great touch.", date: new Date() },
  { id: 4, name: "John D.", rating: 5, text: "Best mechanic in Santa Fe Springs! Honest pricing and quick turnaround.", date: new Date() },
  { id: 5, name: "Sarah M.", rating: 5, text: "My car broke down on the freeway and they got me back on the road the same day. Highly recommend!", date: new Date() },
  { id: 6, name: "Robert L.", rating: 5, text: "Been coming here for 10 years. Father and son team are great people.", date: new Date() },
];

export function useTestimonials() {
  return useQuery({
    queryKey: [api.testimonials.list.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.testimonials.list.path);
        if (!res.ok) {
          console.warn("Failed to fetch testimonials, using fallback data");
          return fallbackTestimonials;
        }
        const data = await res.json();
        return api.testimonials.list.responses[200].parse(data);
      } catch (error) {
        console.warn("Error fetching testimonials, using fallback data", error);
        return fallbackTestimonials;
      }
    },
    initialData: fallbackTestimonials,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
