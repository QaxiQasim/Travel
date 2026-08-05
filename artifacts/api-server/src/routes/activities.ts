import { Router } from "express";
import { db } from "@workspace/db";
import { activitiesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router = Router();

// Get all activities
router.get("/", async (req: any, res: any): Promise<void> => {
  try {
    const activities = await db.select().from(activitiesTable).orderBy(activitiesTable.id);
    res.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an activity (Price, Images)
router.patch("/:id", async (req: any, res: any): Promise<void> => {
  try {
    const { id } = req.params;
    const { priceAed, imageUrl, galleryImages } = req.body;
    
    const updateData: any = {};
    if (priceAed !== undefined) updateData.priceAed = priceAed;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (galleryImages !== undefined) updateData.galleryImages = galleryImages;

    const [updated] = await db.update(activitiesTable)
      .set(updateData)
      .where(eq(activitiesTable.id, parseInt(id)))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: "Activity not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating activity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
