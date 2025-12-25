import { Handler } from "@netlify/functions";
import { storage } from "./utils/storage";

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
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  try {
    // Seed data if needed
    await seedDataIfNeeded();
    
    const servicesList = await storage.getServices();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(servicesList),
    };
  } catch (err) {
    console.error("Error fetching services:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

