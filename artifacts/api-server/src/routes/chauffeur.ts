import { Router } from "express";
import { db, eq } from "@workspace/db";
import { chauffeurVehiclesTable, chauffeurLocationsTable, chauffeurPricingTable } from "@workspace/db/schema";

const router = Router();

// Get the full chauffeur matrix
router.get("/", async (req: any, res: any): Promise<void> => {
  try {
    const vehicles = await db.select().from(chauffeurVehiclesTable);
    const locations = await db.select().from(chauffeurLocationsTable);
    const pricing = await db.select().from(chauffeurPricingTable);

    res.json({ vehicles, locations, pricing });
  } catch (error) {
    console.error("Error fetching chauffeur matrix:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a vehicle
router.post("/vehicles", async (req: any, res: any): Promise<void> => {
  try {
    const { vehicleType, imageUrl } = req.body;
    const [newVehicle] = await db.insert(chauffeurVehiclesTable)
      .values({ vehicleType, imageUrl })
      .returning();
    res.json(newVehicle);
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a location
router.post("/locations", async (req: any, res: any): Promise<void> => {
  try {
    const { locationName } = req.body;
    const [newLocation] = await db.insert(chauffeurLocationsTable)
      .values({ locationName })
      .returning();
    res.json(newLocation);
  } catch (error) {
    console.error("Error adding location:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Upsert pricing
router.put("/pricing", async (req: any, res: any): Promise<void> => {
  try {
    const { vehicleId, locationId, price } = req.body;
    
    // Check if exists
    const existing = await db.select().from(chauffeurPricingTable)
      .where(eq(chauffeurPricingTable.vehicleId, vehicleId))
      .where(eq(chauffeurPricingTable.locationId, locationId));

    let result;
    if (existing.length > 0) {
      [result] = await db.update(chauffeurPricingTable)
        .set({ price })
        .where(eq(chauffeurPricingTable.id, existing[0].id))
        .returning();
    } else {
      [result] = await db.insert(chauffeurPricingTable)
        .values({ vehicleId, locationId, price })
        .returning();
    }

    res.json(result);
  } catch (error) {
    console.error("Error updating pricing:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
