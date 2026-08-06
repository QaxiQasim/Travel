import { pgTable, text, boolean, numeric, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { activitiesTable } from "./activities.js";

export const activityPackagesTable = pgTable("activity_packages", {
  id: uuid("id").primaryKey().defaultRandom(),
  activityId: uuid("activity_id").references(() => activitiesTable.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  price: numeric("price").notNull(),
  imageUrl: text("image_url"),
  description: text("description"),
  isActive: boolean("is_active").default(true),
});

export const insertActivityPackageSchema = createInsertSchema(activityPackagesTable).omit({
  id: true,
});

export type InsertActivityPackage = z.infer<typeof insertActivityPackageSchema>;
export type ActivityPackage = typeof activityPackagesTable.$inferSelect;
