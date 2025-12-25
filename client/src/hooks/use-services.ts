import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

const fallbackServices = [
  { id: 1, name: "Oil Change & Filter", category: "Maintenance", priceMin: 45, priceMax: 89, description: "Full synthetic oil change with premium filter replacement." },
  { id: 2, name: "Brake Service", category: "Repair", priceMin: 180, priceMax: 350, description: "Pad replacement, rotor resurfacing/replacement, and fluid flush." },
  { id: 3, name: "Tire Rotation & Balance", category: "Maintenance", priceMin: 40, priceMax: 60, description: "Extend tire life with professional rotation and balancing." },
  { id: 4, name: "Check Engine Light", category: "Diagnostics", priceMin: 95, priceMax: 150, description: "Comprehensive computer diagnostics to identify issues." },
  { id: 5, name: "Transmission Flush", category: "Maintenance", priceMin: 150, priceMax: 250, description: "Complete fluid exchange to protect your transmission." },
  { id: 6, name: "AC Recharge", category: "Repair", priceMin: 120, priceMax: 200, description: "System leak test and refrigerant recharge." },
];

export function useServices() {
  return useQuery({
    queryKey: [api.services.list.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.services.list.path);
        if (!res.ok) {
          console.warn("Failed to fetch services, using fallback data");
          return fallbackServices;
        }
        const data = await res.json();
        return api.services.list.responses[200].parse(data);
      } catch (error) {
        console.warn("Error fetching services, using fallback data", error);
        return fallbackServices;
      }
    },
    initialData: fallbackServices,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
