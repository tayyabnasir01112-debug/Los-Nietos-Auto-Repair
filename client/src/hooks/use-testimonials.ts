import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useTestimonials() {
  return useQuery({
    queryKey: [api.testimonials.list.path],
    queryFn: async () => {
      const res = await fetch(api.testimonials.list.path);
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return api.testimonials.list.responses[200].parse(await res.json());
    },
    initialData: [
      { id: 1, name: "Michael Rodriguez", rating: 5, text: "Best shop in Santa Fe Springs. Honest pricing and they actually fixed the issue the first time.", date: new Date() },
      { id: 2, name: "Sarah Jenkins", rating: 5, text: "I was quoted $1200 at the dealership. These guys did it for $750 using genuine parts. Highly recommend.", date: new Date() },
      { id: 3, name: "David Chen", rating: 5, text: "Fast, professional, and clean waiting area. The text updates with photos of the repair were a great touch.", date: new Date() },
    ]
  });
}
