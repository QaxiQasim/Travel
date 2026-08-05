import { Router } from "express";
import { db, eq } from "@workspace/db";
import { adminUsersTable } from "@workspace/db/schema";

const router = Router();

router.post("/login", async (req: any, res: any): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const [user] = await db.select().from(adminUsersTable).where(eq(adminUsersTable.email, email)).limit(1);

    if (!user || user.passwordHash !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Since we are not using JWT or sessions for this specific request,
    // we return a simple success token. In a real app, use JWT.
    res.json({ token: "admin_token_" + user.id, user: { email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
