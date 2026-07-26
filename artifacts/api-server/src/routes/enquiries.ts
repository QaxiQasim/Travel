import { Router, type IRouter } from "express";
import { db, enquiriesTable } from "@workspace/db";
import { CreateEnquiryBody } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

// POST /enquiries — submit a booking enquiry
router.post("/enquiries", async (req: any, res: any): Promise<void> => {
  const parsed = CreateEnquiryBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid enquiry body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, email, phone, activityOrPackage, travelDate, guests, message } =
    parsed.data;

  req.log.info(
    { name, email, activityOrPackage },
    "New enquiry received"
  );

  const [enquiry] = await db
    .insert(enquiriesTable)
    .values({
      name,
      email,
      phone,
      activityOrPackage,
      travelDate,
      guests,
      message: message ?? null,
    })
    .returning();

  res.status(201).json({
    ...enquiry,
    createdAt: enquiry.createdAt.toISOString(),
  });
});

// GET /enquiries — list all enquiries (internal use only; not exposed publicly)
// This endpoint is kept for admin/debugging purposes.
// In production, add authentication middleware before this route.
router.get("/enquiries", async (_req: any, res: any): Promise<void> => {
  // Only allow in development for now
  if (process.env.NODE_ENV !== "development") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  const enquiries = await db
    .select()
    .from(enquiriesTable)
    .orderBy(desc(enquiriesTable.createdAt));

  res.json(
    enquiries.map((e) => ({
      ...e,
      createdAt: e.createdAt.toISOString(),
    }))
  );
});

export default router;
