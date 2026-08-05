import { Router } from "express";
import { db } from "@workspace/db";
import { chauffeurRatesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router = Router();

// Get all chauffeur rates
router.get("/", async (req: any, res: any): Promise<void> => {
  try {
    const rates = await db.select().from(chauffeurRatesTable).orderBy(chauffeurRatesTable.id);
    res.json(rates);
  } catch (error) {
    console.error("Error fetching chauffeur rates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a chauffeur rate (Prices)
router.patch("/:id", async (req: any, res: any): Promise<void> => {
  try {
    const { id } = req.params;
    const { transferPrice, halfDayPrice, fullDayPrice } = req.body;
    
    const updateData: any = {};
    if (transferPrice !== undefined) updateData.transferPrice = transferPrice;
    if (halfDayPrice !== undefined) updateData.halfDayPrice = halfDayPrice;
    if (fullDayPrice !== undefined) updateData.fullDayPrice = fullDayPrice;

    const [updated] = await db.update(chauffeurRatesTable)
      .set(updateData)
      .where(eq(chauffeurRatesTable.id, parseInt(id)))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: "Rate not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating chauffeur rate:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
