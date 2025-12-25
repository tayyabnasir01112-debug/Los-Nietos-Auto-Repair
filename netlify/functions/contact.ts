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
    const body = JSON.parse(event.body || "{}");
    
    // Validate input
    let input;
    try {
      input = insertInquirySchema.parse(body);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            message: validationError.errors[0].message,
            field: validationError.errors[0].path.join("."),
          }),
        };
      }
      throw validationError;
    }
    
    // Try to save to database
    try {
      // Seed data if needed (run once) - but don't block on errors
      try {
        await seedDataIfNeeded();
      } catch (seedError) {
        console.warn("Warning: Could not seed data:", seedError);
        // Continue anyway
      }
      
      await storage.createInquiry(input);
      console.log("New inquiry received and saved:", input);
    } catch (dbError: any) {
      // Log the detailed error for debugging
      console.error("Database error:", dbError);
      console.error("Error message:", dbError?.message);
      console.error("Error stack:", dbError?.stack);
      console.log("New inquiry received (not saved to DB):", input);
      
      // Check if it's a connection error
      if (dbError?.message?.includes("connect") || dbError?.message?.includes("ECONNREFUSED") || dbError?.code === "ENOTFOUND") {
        return {
          statusCode: 503,
          headers,
          body: JSON.stringify({ 
            message: "Database connection unavailable. Please try again later or call us at (562) 692-4245.",
          }),
        };
      }
      
      // For other DB errors, still return 500 but with better message
      throw dbError;
    }
    
    // In a real app with email integration, we would send the email here.

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Inquiry received successfully" }),
    };
  } catch (err) {
    console.error("Error processing inquiry:", err);
    
    // Handle Zod validation errors (shouldn't reach here if validation worked above, but just in case)
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
    
    // Generic error response
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    console.error("Full error details:", err);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: errorMessage || "Internal server error. Please try again or call us at (562) 692-4245.",
      }),
    };
  }
};

