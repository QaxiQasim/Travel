import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: {
    id?: string;
    created_at?: string;
    customer_name?: string;
    email?: string;
    phone?: string;
    service_type?: string;
    location?: string;
    persons?: number;
    requested_date?: string;
    total_price?: string | number;
    status?: string;
    notes?: string;
  };
  schema: string;
  old_record: null | Record<string, unknown>;
}

serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const payload: WebhookPayload = await req.json();
    const record = payload.record;

    if (!record) {
      return new Response(JSON.stringify({ message: "No record found in payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Extract booking details matching Supabase "bookings" table column names
    const customerName = record.customer_name || "N/A";
    const email = record.email || "N/A";
    const phone = record.phone || "N/A";
    const serviceType = record.service_type || "Activity";
    const location = record.location || "N/A";
    const persons = record.persons || 1;
    const requestedDate = record.requested_date || "N/A";
    const totalPrice = record.total_price || "0";
    const notes = record.notes || "None";

    // Read environment variables / secrets from Supabase
    const ultramsgInstance = Deno.env.get("ULTRAMSG_INSTANCE_ID") || "instance188631";
    const ultramsgToken = Deno.env.get("ULTRAMSG_TOKEN") || "lz6ieplx7s8ylqbi";
    const ownerWhatsApp = Deno.env.get("OWNER_WHATSAPP_NUMBER") || "+971524204409";
    
    const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";
    const senderEmail = Deno.env.get("SENDER_EMAIL") || "onboarding@resend.dev";
    const ownerEmail = Deno.env.get("OWNER_EMAIL") || "info@donnvay.com";

    // Formatted WhatsApp Message
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

    const results: Record<string, unknown> = {};

    // 1. Send WhatsApp Notification via Ultramsg API
    if (ownerWhatsApp && ultramsgToken) {
      try {
        const cleanPhone = ownerWhatsApp.replace(/[^0-9]/g, "");
        const ultramsgUrl = `https://api.ultramsg.com/${ultramsgInstance}/messages/chat`;
        
        const waResponse = await fetch(ultramsgUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: ultramsgToken,
            to: cleanPhone,
            body: formattedMessage,
          }),
        });

        const waData = await waResponse.json();
        results.whatsapp = { status: waResponse.status, response: waData };
      } catch (waErr: any) {
        console.error("WhatsApp notification error:", waErr);
        results.whatsapp = { error: waErr.message };
      }
    } else {
      results.whatsapp = { skipped: "OWNER_WHATSAPP_NUMBER secret is not set" };
    }

    // 2. Send Email Notification via Resend API
    if (resendApiKey && ownerEmail) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: senderEmail,
            to: ownerEmail,
            subject: `🔔 Nayi Booking: ${customerName} - ${location}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #0E7C86; color: #ffffff; padding: 20px; text-align: center;">
                  <h2 style="margin: 0;">Nayi Booking Aayi Hai!</h2>
                </div>
                <div style="padding: 24px; color: #333333; line-height: 1.6;">
                  <p style="font-size: 16px;"><strong>Customer Name:</strong> ${customerName}</p>
                  <p style="font-size: 16px;"><strong>Service/Location:</strong> ${location}</p>
                  <p style="font-size: 16px;"><strong>Date:</strong> ${requestedDate}</p>
                  <p style="font-size: 16px;"><strong>Persons:</strong> ${persons}</p>
                  <p style="font-size: 16px;"><strong>Phone:</strong> ${phone}</p>
                  <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
                  <p style="font-size: 16px;"><strong>Total Price:</strong> AED ${totalPrice}</p>
                  <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />
                  <p style="font-size: 14px; color: #666666;"><strong>Notes/Details:</strong><br />${notes.replace(/\n/g, "<br />")}</p>
                </div>
                <div style="background-color: #f9f9f9; color: #888888; padding: 12px; text-align: center; font-size: 12px;">
                  Donnvay Travel Booking Alert System
                </div>
              </div>
            `,
          }),
        });

        const emailData = await emailResponse.json();
        results.email = { status: emailResponse.status, response: emailData };
      } catch (emailErr: any) {
        console.error("Email notification error:", emailErr);
        results.email = { error: emailErr.message };
      }
    } else {
      results.email = { skipped: "RESEND_API_KEY secret is not set" };
    }

    return new Response(JSON.stringify({ success: true, results }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Webhook processing failed:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
