import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { activitiesTable, chauffeurVehiclesTable } from "../src/schema/index.js";
import { activities } from "../../../artifacts/rayna-tours/src/data/mockData.js";
import { transferRates } from "../../../artifacts/rayna-tours/src/data/transferRates.js";

const { Pool } = pg;

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log("Seeding activities...");
  for (const activity of activities) {
    await db.insert(activitiesTable).values({
      slug: activity.slug,
      name: activity.title || activity.slug,
      description: activity.description || activity.shortDescription,
      category: activity.category,
      coverImageUrl: activity.imageUrl,
    }).onConflictDoNothing();
  }

  console.log("Seeding chauffeur rates...");
  const typeMap: Record<string, string> = {
    "Lexus ES300": "luxury",
    "Kia Carnival": "vans",
    "Audi A6": "luxury",
    "Mercedes V Class 250": "vans",
    "GMC SUV / Suburban": "luxury",
    "Mercedes Sprinter 16/19 Pax": "vans",
    "Mercedes S 500": "luxury",
    "Cadillac Escalade": "luxury",
    "Rolls Royce Ghost": "luxury",
    "Rolls Royce Cullinan": "luxury",
    "BMW 7 Series": "luxury",
    "Toyota Hiace 14 Seater": "vans",
    "35 Seater Luxury Coach": "buses",
    "50 Seater Luxury Coach": "buses",
  };
  
  const paxMap: Record<string, number> = {
    "Lexus ES300": 3,
    "Kia Carnival": 6,
    "Audi A6": 3,
    "Mercedes V Class 250": 6,
    "GMC SUV / Suburban": 6,
    "Mercedes Sprinter 16/19 Pax": 18,
    "Mercedes S 500": 3,
    "Cadillac Escalade": 6,
    "Rolls Royce Ghost": 3,
    "Rolls Royce Cullinan": 4,
    "BMW 7 Series": 3,
    "Toyota Hiace 14 Seater": 14,
    "35 Seater Luxury Coach": 35,
    "50 Seater Luxury Coach": 50,
  };

  const luggageMap: Record<string, number> = {
    "Lexus ES300": 2,
    "Kia Carnival": 4,
    "Audi A6": 2,
    "Mercedes V Class 250": 4,
    "GMC SUV / Suburban": 5,
    "Mercedes Sprinter 16/19 Pax": 10,
    "Mercedes S 500": 2,
    "Cadillac Escalade": 5,
    "Rolls Royce Ghost": 2,
    "Rolls Royce Cullinan": 3,
    "BMW 7 Series": 2,
    "Toyota Hiace 14 Seater": 7,
    "35 Seater Luxury Coach": 20,
    "50 Seater Luxury Coach": 30,
  };

  const imageMap: Record<string, string> = {
    "Lexus ES300": "/assets/lexus_es300.png",
    "Kia Carnival": "/assets/kia_carnival_1.png",
    "Audi A6": "/assets/audi_a6_1.png",
    "Mercedes V Class 250": "/assets/vclass_1.png",
    "GMC SUV / Suburban": "/assets/gmc_1.png",
    "Mercedes Sprinter 16/19 Pax": "/assets/sprinter_1.jpg",
    "Mercedes S 500": "/assets/s500_1.png",
    "Cadillac Escalade": "/assets/escalade_2.png",
    "Rolls Royce Ghost": "/assets/ghost_1.png",
    "Rolls Royce Cullinan": "/assets/cullinan_1.png",
    "BMW 7 Series": "/assets/bmw7_1.png",
    "Toyota Hiace 14 Seater": "/assets/hiace_1.png",
    "35 Seater Luxury Coach": "/assets/coach35_1.png",
    "50 Seater Luxury Coach": "/assets/coach50_1.png",
  };

  // Use base rates (Dubai Airport to Deira) for DB seeding
  const baseRates = transferRates["Dubai Airport"]["Deira / Bur Dubai / Al Nahda"];
  
  for (const [vehicle] of Object.entries(baseRates)) {
    await db.insert(chauffeurVehiclesTable).values({
      vehicleType: vehicle,
      imageUrl: imageMap[vehicle] || "/assets/lexus_es300.png",
    }).onConflictDoNothing();
  }

  console.log("Seeding done.");
  process.exit(0);
}

seed().catch(console.error);
