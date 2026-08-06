import { Router } from "express";
import { db, eq } from "@workspace/db";
import { dashboardUsersTable } from "@workspace/db/schema";
// In a real implementation, you'd use @supabase/supabase-js with SUPABASE_SERVICE_ROLE_KEY
// import { createClient } from "@supabase/supabase-js";

const router = Router();

// Get all dashboard users
router.get("/users", async (req: any, res: any): Promise<void> => {
  try {
    const users = await db.select().from(dashboardUsersTable);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new dashboard user
router.post("/users", async (req: any, res: any): Promise<void> => {
  try {
    const { email, password, fullName, role } = req.body;
    
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: "Email, password, and full name are required" });
    }

    // TODO: Use Supabase Admin API to create the user in auth.users
    // const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    // const { data, error } = await supabase.auth.admin.createUser({ email, password, email_confirm: true });
    // if (error) throw error;
    // const authId = data.user.id;
    
    // For now, we simulate the auth user ID since we don't have keys yet.
    const authId = crypto.randomUUID(); // Placeholder

    const [newUser] = await db.insert(dashboardUsersTable).values({
      id: authId,
      fullName,
      role: role || 'Editor',
      isActive: true
    }).returning();

    res.json(newUser);
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ error: "Internal Server Error", details: (error as any).message });
  }
});

// Update a user (e.g. role, active status)
router.patch("/users/:id", async (req: any, res: any): Promise<void> => {
  try {
    const { id } = req.params;
    const { role, isActive } = req.body;
    
    const updateData: any = {};
    if (role !== undefined) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;

    const [updated] = await db.update(dashboardUsersTable)
      .set(updateData)
      .where(eq(dashboardUsersTable.id, id))
      .returning();

    res.json(updated);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
