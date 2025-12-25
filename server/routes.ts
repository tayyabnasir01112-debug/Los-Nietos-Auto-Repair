import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Contact Form
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.createInquiry(input);
      
      // In a real app with the Resend integration, we would send the email here.
      // Since the user dismissed it, we'll just log it.
      console.log("New inquiry received:", input);

      res.status(200).json({ message: "Inquiry received successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Services List
  app.get(api.services.list.path, async (req, res) => {
    const servicesList = await storage.getServices();
    res.json(servicesList);
  });

  // Testimonials List
  app.get(api.testimonials.list.path, async (req, res) => {
    const testimonialsList = await storage.getTestimonials();
    res.json(testimonialsList);
  });

  // Seed Data (if empty)
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingServices = await storage.getServices();
  if (existingServices.length === 0) {
    const servicesToSeed = [
      { name: "Oil Change", category: "Maintenance", priceMin: 40, priceMax: 100, description: "Full synthetic or conventional oil change" },
      { name: "Brake Service", category: "Repair", priceMin: 150, priceMax: 400, description: "Pad replacement, rotor resurfacing" },
      { name: "Diagnostic", category: "Inspection", priceMin: 80, priceMax: 150, description: "Computer diagnostics and inspection" },
      { name: "Transmission Flush", category: "Maintenance", priceMin: 120, priceMax: 250, description: "Fluid exchange and filter replacement" },
      { name: "AC Recharge", category: "Maintenance", priceMin: 100, priceMax: 200, description: "Refrigerant refill and leak check" },
    ];
    for (const s of servicesToSeed) {
      await storage.createService(s);
    }
  }

  const existingTestimonials = await storage.getTestimonials();
  if (existingTestimonials.length === 0) {
    const testimonialsToSeed = [
      { name: "John D.", rating: 5, text: "Best mechanic in Santa Fe Springs! Honest pricing and quick turnaround." },
      { name: "Sarah M.", rating: 5, text: "My car broke down on the freeway and they got me back on the road the same day. Highly recommend!" },
      { name: "Robert L.", rating: 5, text: "Been coming here for 10 years. Father and son team are great people." },
    ];
    for (const t of testimonialsToSeed) {
      await storage.createTestimonial(t);
    }
  }
}
