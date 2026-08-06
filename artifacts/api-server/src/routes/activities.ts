import { Router } from "express";
import { db, eq } from "@workspace/db";
import { activitiesTable, activityPackagesTable } from "@workspace/db/schema";

const router = Router();

// Get all activities with packages
router.get("/", async (req: any, res: any): Promise<void> => {
  try {
    const activitiesList = await db.select().from(activitiesTable).orderBy(activitiesTable.createdAt);
    const packagesList = await db.select().from(activityPackagesTable);

    // Group packages by activity
    const activitiesWithPackages = activitiesList.map(activity => ({
      ...activity,
      packages: packagesList.filter(p => p.activityId === activity.id)
    }));

    res.json(activitiesWithPackages);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new activity
router.post("/", async (req: any, res: any): Promise<void> => {
  try {
    const { name, description, category, coverImageUrl, packages } = req.body;
    
    // Insert activity
    const [newActivity] = await db.insert(activitiesTable)
      .values({ name, description, category, coverImageUrl })
      .returning();

    // Insert packages if any
    let createdPackages = [];
    if (packages && Array.isArray(packages) && packages.length > 0) {
      const packagesData = packages.map(p => ({
        activityId: newActivity.id,
        name: p.name,
        price: p.price,
        imageUrl: p.imageUrl,
        description: p.description
      }));
      createdPackages = await db.insert(activityPackagesTable).values(packagesData).returning();
    }

    res.json({ ...newActivity, packages: createdPackages });
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an activity
router.patch("/:id", async (req: any, res: any): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, category, coverImageUrl, isActive } = req.body;
    
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (coverImageUrl !== undefined) updateData.coverImageUrl = coverImageUrl;
    if (isActive !== undefined) updateData.isActive = isActive;

    const [updated] = await db.update(activitiesTable)
      .set(updateData)
      .where(eq(activitiesTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Activity not found" });
      return;
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating activity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an activity
router.delete("/:id", async (req: any, res: any): Promise<void> => {
  try {
    const { id } = req.params;
    await db.delete(activitiesTable).where(eq(activitiesTable.id, id));
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a package to an activity
router.post("/:id/packages", async (req: any, res: any): Promise<void> => {
  try {
    const { id } = req.params; // activityId
    const { name, price, imageUrl, description } = req.body;
    
    const [newPackage] = await db.insert(activityPackagesTable)
      .values({ activityId: id, name, price, imageUrl, description })
      .returning();

    res.json(newPackage);
  } catch (error) {
    console.error("Error adding package:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a package
router.patch("/packages/:pkgId", async (req: any, res: any): Promise<void> => {
  try {
    const { pkgId } = req.params;
    const { name, price, imageUrl, description, isActive } = req.body;
    
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = price;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (description !== undefined) updateData.description = description;
    if (isActive !== undefined) updateData.isActive = isActive;

    const [updated] = await db.update(activityPackagesTable)
      .set(updateData)
      .where(eq(activityPackagesTable.id, pkgId))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Package not found" });
      return;
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a package
router.delete("/packages/:pkgId", async (req: any, res: any): Promise<void> => {
  try {
    const { pkgId } = req.params;
    await db.delete(activityPackagesTable).where(eq(activityPackagesTable.id, pkgId));
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
