import { Handler } from "@netlify/functions";
import { storage } from "./utils/storage";

// Seed data on first request if needed
async function seedDataIfNeeded() {
  try {
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
    
    const testimonialsList = await storage.getTestimonials();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(testimonialsList),
    };
  } catch (err) {
    console.error("Error fetching testimonials:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

