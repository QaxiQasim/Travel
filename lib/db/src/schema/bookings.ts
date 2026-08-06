import { pgTable, text, timestamp, numeric, date, integer, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { activitiesTable } from "./activities.js";
import { activityPackagesTable } from "./activity_packages.js";
import { chauffeurVehiclesTable } from "./chauffeur.js";

export const bookingsTable = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  customerName: text("customer_name"),
  email: text("email"),
  phone: text("phone"),
  serviceType: text("service_type"), // 'activity' or 'chauffeur'
  activityId: uuid("activity_id").references(() => activitiesTable.id),
  packageId: uuid("activity_package_id").references(() => activityPackagesTable.id),
  vehicleId: uuid("vehicle_id").references(() => chauffeurVehiclesTable.id),
  location: text("location"),
  persons: integer("persons"),
  requestedDate: date("requested_date"),
  totalPrice: numeric("total_price"),
  status: text("status").default("New"),
  notes: text("notes"),
});

export const insertBookingSchema = createInsertSchema(bookingsTable).omit({
  id: true,
  createdAt: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookingsTable.$inferSelect;
