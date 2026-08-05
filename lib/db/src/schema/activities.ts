import { pgTable, serial, text, integer, doublePrecision, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const activitiesTable = pgTable("activities", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  shortDescription: text("short_description").notNull(),
  description: text("description").notNull(),
  priceAed: integer("price_aed").notNull(),
  duration: text("duration").notNull(),
  imageUrl: text("image_url").notNull(),
  galleryImages: jsonb("gallery_images").$type<string[]>().default([]).notNull(),
  inclusions: jsonb("inclusions").$type<string[]>().default([]).notNull(),
  options: jsonb("options").$type<{name: string, priceAed: number, description: string, inclusions: string[]}[]>().default([]).notNull(),
  faqs: jsonb("faqs").$type<{question: string, answer: string}[]>().default([]).notNull(),
  relatedActivitySlugs: jsonb("related_activity_slugs").$type<string[]>().default([]).notNull(),
  rating: doublePrecision("rating").default(0).notNull(),
  reviewCount: integer("review_count").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const insertActivitySchema = createInsertSchema(activitiesTable).omit({
  id: true,
});

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activitiesTable.$inferSelect;
