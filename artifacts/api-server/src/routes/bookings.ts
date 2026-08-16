import { Router } from "express";
import { db, eq, desc } from "@workspace/db";
import { bookingsTable } from "@workspace/db/schema";
import { activities as staticActivities } from "../data/packages.js";

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
    const bookingData = { ...req.body };
    
    // Auto-calculate / fallback price if missing or '0'
    if (!bookingData.totalPrice || bookingData.totalPrice === '0' || bookingData.totalPrice === 'undefined') {
      let calculatedPrice: number | null = null;
      const notes = bookingData.notes || '';
      const pax = Number(bookingData.persons) || 1;

      // Check package names in notes
      if (notes.includes('Private Car (Full Day)')) calculatedPrice = 800 * pax;
      else if (notes.includes('Private Car (Half Day)')) calculatedPrice = 500 * pax;
      else if (notes.includes('Full day) SIC')) calculatedPrice = 400 * pax;
      else if (notes.includes('Half day) SIC')) calculatedPrice = 200 * pax;
      else {
        // Search staticActivities options
        for (const act of staticActivities) {
          if (act.options) {
            const matched = act.options.find((opt: any) => 
              notes.toLowerCase().includes(opt.name.toLowerCase()) ||
              (bookingData.location && bookingData.location.toLowerCase().includes(opt.name.toLowerCase()))
            );
            if (matched && matched.priceAed) {
              calculatedPrice = Number(matched.priceAed) * pax;
              break;
            }
          }
        }
      }

      if (calculatedPrice) {
        bookingData.totalPrice = String(calculatedPrice);
      }
    }

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
