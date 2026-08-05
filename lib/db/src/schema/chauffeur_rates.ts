import { pgTable, serial, text, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const chauffeurRatesTable = pgTable("chauffeur_rates", {
  id: serial("id").primaryKey(),
  vehicleName: text("vehicle_name").notNull(),
  pax: integer("pax").notNull(),
  luggage: integer("luggage").notNull(),
  transferPrice: integer("transfer_price").notNull(),
  halfDayPrice: integer("half_day_price").notNull(),
  fullDayPrice: integer("full_day_price").notNull(),
  imageUrl: text("image_url").notNull(),
  type: text("type").notNull(),
});

export const insertChauffeurRateSchema = createInsertSchema(chauffeurRatesTable).omit({
  id: true,
});

export type InsertChauffeurRate = z.infer<typeof insertChauffeurRateSchema>;
export type ChauffeurRate = typeof chauffeurRatesTable.$inferSelect;
