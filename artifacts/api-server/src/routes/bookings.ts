import { Router } from "express";
import { db, eq, desc } from "@workspace/db";
import { bookingsTable } from "@workspace/db/schema";

const router = Router();

// Get all bookings
router.get("/", async (req: any, res: any): Promise<void> => {
  try {
    const bookings = await db.select()
      .from(bookingsTable)
      .orderBy(desc(bookingsTable.createdAt));
      
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a booking
router.post("/", async (req: any, res: any): Promise<void> => {
  try {
    const bookingData = req.body;
    const [newBooking] = await db.insert(bookingsTable)
      .values(bookingData)
      .returning();
      
    res.json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update booking status
router.patch("/:id/status", async (req: any, res: any): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const [updated] = await db.update(bookingsTable)
      .set({ status })
      .where(eq(bookingsTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
