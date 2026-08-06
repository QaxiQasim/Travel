import { pgTable, text, boolean, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const dashboardUsersTable = pgTable("dashboard_users", {
  id: uuid("id").primaryKey(), // References auth.users(id)
  fullName: text("full_name"),
  role: text("role").default("Editor"), // Admin / Editor / Viewer
  isActive: boolean("is_active").default(true),
});

export const insertDashboardUserSchema = createInsertSchema(dashboardUsersTable);

export type InsertDashboardUser = z.infer<typeof insertDashboardUserSchema>;
export type DashboardUser = typeof dashboardUsersTable.$inferSelect;
