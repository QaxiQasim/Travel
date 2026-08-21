import { Router } from "express";
import { db, eq, desc } from "@workspace/db";
import { bookingsTable } from "@workspace/db/schema";
import { activities as staticActivities } from "../data/packages.js";

const router = Router();

async function sendWhatsAppNotification(booking: any) {
  try {
    const customerName = booking.customerName || booking.customer_name || "N/A";
    const email = booking.email || "N/A";
    const phone = booking.phone || "N/A";
    const location = booking.location || "N/A";
    const persons = booking.persons || 1;
    const requestedDate = booking.requestedDate || booking.requested_date || "N/A";
    const totalPrice = booking.totalPrice || booking.total_price || "0";
    const notes = booking.notes || "None";

    const formattedMessage = `🔔 Nayi Booking Aayi Hai!

👤 Naam: ${customerName}
📍 Activity/Location: ${location}
📅 Date: ${requestedDate}
👥 Persons: ${persons}
📞 Phone: ${phone}
✉️ Email: ${email}
💰 Total Price: AED ${totalPrice}

📋 Notes:
${notes}`;

    const ultramsgInstance = process.env.ULTRAMSG_INSTANCE_ID || "instance188631";
    const ultramsgToken = process.env.ULTRAMSG_TOKEN || "lz6ieplx7s8ylqbi";
    const rawOwnerPhone = process.env.OWNER_WHATSAPP_NUMBER || "971524204409";
    const ownerPhone = rawOwnerPhone.replace(/[^0-9]/g, "");

    const url = `https://api.ultramsg.com/${ultramsgInstance}/messages/chat`;
    const params = new URLSearchParams({
      token: ultramsgToken,
      to: ownerPhone,
      body: formattedMessage,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    const data = await response.json();
    if (data && data.error) {
      console.error("Ultramsg API Error:", data.error);
    } else {
      console.log("Ultramsg WhatsApp notification result:", data);
    }
    return data;
  } catch (err) {
    console.error("Failed to send WhatsApp notification via Ultramsg:", err);
  }
}

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
      
    // Send instant WhatsApp notification and await before returning to prevent Vercel Serverless freeze
    await sendWhatsAppNotification(newBooking);

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
