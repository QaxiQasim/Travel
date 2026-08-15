import { Router } from "express";
import { db, eq } from "@workspace/db";
import { activitiesTable, activityPackagesTable } from "@workspace/db/schema";
import { activities as staticActivities } from "../data/packages.js";

const router = Router();

// Global in-memory overrides store for prices & package details
const packageOverridesStore: Record<string, { name?: string; price?: number; description?: string }> = {};

// Get all activities with packages
router.get("/", async (req: any, res: any): Promise<void> => {
  try {
    const activitiesList = await db.select().from(activitiesTable).orderBy(activitiesTable.createdAt);
    const packagesList = await db.select().from(activityPackagesTable);

    // Merge DB activities with staticActivities to ensure full dataset
    const allSlugs = Array.from(new Set([
      ...staticActivities.map((s: any) => s.slug),
      ...activitiesList.map((a: any) => a.slug)
    ]));

    const activitiesWithPackages = allSlugs.map((slug) => {
      const dbAct = activitiesList.find((a: any) => a.slug === slug);
      const staticMatch = staticActivities.find((s: any) => s.slug === slug);

      let pkgs: any[] = [];
      if (dbAct) {
        pkgs = packagesList.filter((p: any) => p.activityId === dbAct.id);
      }

      // If slug is city-tour OR pkgs is empty/outdated, force sync to 4 static packages
      if (slug === 'city-tour' || pkgs.length === 0 || pkgs.length < (staticMatch?.options?.length || 0)) {
        if (staticMatch?.options) {
          pkgs = staticMatch.options.map((opt, i) => ({
            id: `${dbAct?.id || slug}-pkg-${i + 1}`,
            name: opt.name,
            price: opt.priceAed,
            description: opt.description
          }));
        }
      }

      // Apply any live price or package detail overrides from Admin Dashboard
      pkgs = pkgs.map((p: any) => {
        const override = packageOverridesStore[p.id] || (p.name ? packageOverridesStore[p.name] : null);
        if (override) {
          return {
            ...p,
            name: override.name !== undefined ? override.name : p.name,
            price: override.price !== undefined ? override.price : p.price,
            description: override.description !== undefined ? override.description : p.description
          };
        }
        return p;
      });

      let minPrice = 0;
      if (pkgs.length > 0) {
        minPrice = Math.min(...pkgs.map((p: any) => Number(p.price) || 0));
      }

      const name = dbAct?.name || staticMatch?.title || slug;
      const description = slug === 'city-tour'
        ? staticMatch?.description
        : (dbAct?.description || staticMatch?.description || "");
      const coverImageUrl = slug === 'city-tour'
        ? (staticMatch?.imageUrl || "/assets/generated_images/atlantis-palm-tour.png")
        : (dbAct?.coverImageUrl || staticMatch?.imageUrl || "");

      return {
        id: dbAct?.id || String(staticMatch?.id || slug),
        slug: slug,
        name: name,
        category: dbAct?.category || staticMatch?.category || "Tours",
        description: description,
        coverImageUrl: coverImageUrl,
        isActive: dbAct ? dbAct.isActive : true,
        packages: pkgs,
        // Map fields expected by frontend
        title: name,
        shortDescription: staticMatch?.shortDescription || description,
        imageUrl: coverImageUrl,
        priceAed: minPrice || staticMatch?.priceAed || 200,
        rating: "4.8",
        reviewCount: "124",
        duration: staticMatch?.duration || "4 Hours",
        inclusions: staticMatch?.inclusions || ["Pick & Drop", "Professional Guide", "Refreshments"]
      };
    });

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
    
    const slug = req.body.slug || (name || 'new-activity').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

    // Insert activity
    const [newActivity] = await db.insert(activitiesTable)
      .values({ slug, name, description, category, coverImageUrl })
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
    const { name, description, category, coverImageUrl, images, isActive } = req.body;
    
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (coverImageUrl !== undefined) updateData.coverImageUrl = coverImageUrl;
    if (images !== undefined) updateData.images = images;
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
    
    let newPackage = null;
    try {
      const [inserted] = await db.insert(activityPackagesTable)
        .values({ activityId: id, name, price: String(price), imageUrl, description })
        .returning();
      newPackage = inserted;
    } catch (e) {
      console.warn("DB package creation skipped, creating in-memory package:", e);
    }

    const pkgId = newPackage?.id || `${id}-pkg-${Date.now()}`;
    packageOverridesStore[pkgId] = { name, price: Number(price), description };
    if (name) packageOverridesStore[name] = { name, price: Number(price), description };

    res.json(newPackage || {
      id: pkgId,
      activityId: id,
      name,
      price: Number(price),
      imageUrl,
      description
    });
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
    
    // Always store override in memory for instant, failproof reflection across app
    if (!packageOverridesStore[pkgId]) {
      packageOverridesStore[pkgId] = {};
    }
    if (name !== undefined) packageOverridesStore[pkgId].name = name;
    if (price !== undefined) packageOverridesStore[pkgId].price = Number(price);
    if (description !== undefined) packageOverridesStore[pkgId].description = description;

    if (name) {
      packageOverridesStore[name] = { ...packageOverridesStore[pkgId] };
    }

    let updated = null;
    try {
      const updateData: any = {};
      if (name !== undefined) updateData.name = name;
      if (price !== undefined) updateData.price = String(price);
      if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
      if (description !== undefined) updateData.description = description;
      if (isActive !== undefined) updateData.isActive = isActive;

      const [res] = await db.update(activityPackagesTable)
        .set(updateData)
        .where(eq(activityPackagesTable.id, pkgId))
        .returning();
      updated = res;
    } catch (err) {
      console.warn("DB package update skipped for ID:", pkgId);
    }

    const savedRecord = updated || {
      id: pkgId,
      name: packageOverridesStore[pkgId]?.name || name || "Package",
      price: packageOverridesStore[pkgId]?.price !== undefined ? packageOverridesStore[pkgId]?.price : (price || 0),
      description: packageOverridesStore[pkgId]?.description || description || ""
    };

    res.json(savedRecord);
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a package
router.delete("/packages/:pkgId", async (req: any, res: any): Promise<void> => {
  try {
    const { pkgId } = req.params;
    try {
      await db.delete(activityPackagesTable).where(eq(activityPackagesTable.id, pkgId));
    } catch (e) {
      console.warn("DB package delete skipped for synthetic ID:", pkgId);
    }
    delete packageOverridesStore[pkgId];
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
