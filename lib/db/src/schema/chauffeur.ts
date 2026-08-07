import { pgTable, text, timestamp, numeric, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const chauffeurVehiclesTable = pgTable("chauffeur_vehicles", {
  id: uuid("id").primaryKey().defaultRandom(),
  vehicleType: text("vehicle_type").notNull(),
  imageUrl: text("image_url"),
});

export const chauffeurLocationsTable = pgTable("chauffeur_locations", {
  id: uuid("id").primaryKey().defaultRandom(),
  locationName: text("location_name").notNull(),
});

export const chauffeurPricingTable = pgTable("chauffeur_pricing", {
  id: uuid("id").primaryKey().defaultRandom(),
  vehicleId: uuid("vehicle_id").references(() => chauffeurVehiclesTable.id, { onDelete: 'cascade' }),
  fromLocationId: uuid("from_location_id").references(() => chauffeurLocationsTable.id, { onDelete: 'cascade' }),
  toLocationId: uuid("to_location_id").references(() => chauffeurLocationsTable.id, { onDelete: 'cascade' }),
  price: numeric("price").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const insertChauffeurVehicleSchema = createInsertSchema(chauffeurVehiclesTable).omit({ id: true });
export const insertChauffeurLocationSchema = createInsertSchema(chauffeurLocationsTable).omit({ id: true });
export const insertChauffeurPricingSchema = createInsertSchema(chauffeurPricingTable).omit({ id: true, updatedAt: true });

export type ChauffeurVehicle = typeof chauffeurVehiclesTable.$inferSelect;
export type ChauffeurLocation = typeof chauffeurLocationsTable.$inferSelect;
export type ChauffeurPricing = typeof chauffeurPricingTable.$inferSelect;
