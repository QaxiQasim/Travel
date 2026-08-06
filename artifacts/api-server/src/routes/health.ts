// @ts-nocheck
import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";

import { db, eq } from "@workspace/db";
import { activitiesTable } from "@workspace/db/schema";

router.get("/", async (req: any, res: any) => {
  const url = process.env.DATABASE_URL || "NOT SET";
  try {
    const data = await db.select().from(activitiesTable).where(eq(activitiesTable.id, 1));
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      dbUrlPrefix: url.substring(0, 30),
      dbPrice: data[0]?.priceAed
    });
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

router.get("/healthz", (req: any, res: any) => {
  res.send("ok");
});

export default router;
