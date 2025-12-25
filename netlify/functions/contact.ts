import { Handler } from "@netlify/functions";
import { storage } from "./utils/storage";
import { insertInquirySchema } from "../../shared/schema";
import { z } from "zod";

// Seed data on first request if needed
async function seedDataIfNeeded() {
  try {
    const services = await storage.getServices();
    if (services.length === 0) {
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

    const testimonials = await storage.getTestimonials();
    if (testimonials.length === 0) {
      const testimonialsToSeed = [
        { name: "John D.", rating: 5, text: "Best mechanic in Santa Fe Springs! Honest pricing and quick turnaround." },
        { name: "Sarah M.", rating: 5, text: "My car broke down on the freeway and they got me back on the road the same day. Highly recommend!" },
        { name: "Robert L.", rating: 5, text: "Been coming here for 10 years. Father and son team are great people." },
      ];
      for (const t of testimonialsToSeed) {
        await storage.createTestimonial(t);
      }
    }
  } catch (error) {
    console.error("Error seeding data:", error);
    // Don't throw, just log - seeding is not critical
  }
}

export const handler: Handler = async (event, context) => {
  // Handle CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  try {
    // Seed data if needed (run once)
    await seedDataIfNeeded();

    const body = JSON.parse(event.body || "{}");
    const input = insertInquirySchema.parse(body);
    
    await storage.createInquiry(input);
    
    // In a real app with email integration, we would send the email here.
    console.log("New inquiry received:", input);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Inquiry received successfully" }),
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        }),
      };
    }
    
    console.error("Error processing inquiry:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

