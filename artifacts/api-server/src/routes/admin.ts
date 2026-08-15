import { Router } from "express";
import { db, eq } from "@workspace/db";
import { dashboardUsersTable } from "@workspace/db/schema";

const router = Router();

export interface UserRecord {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

// Global in-memory user registry for instant, reliable dashboard authentication
const usersStore: UserRecord[] = [
  {
    id: "user-admin-1",
    fullName: "Qasim Mushtaq",
    email: "qasimashtaq344@gmail.com",
    password: "Password123!",
    role: "Admin",
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "user-admin-2",
    fullName: "Admin Control",
    email: "admin@donnvay.com",
    password: "AdminPassword123!",
    role: "Admin",
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

// Get all dashboard users
router.get("/users", async (req: any, res: any): Promise<void> => {
  try {
    let dbUsers: any[] = [];
    try {
      dbUsers = await db.select().from(dashboardUsersTable);
    } catch (e) {
      console.warn("DB user query skipped:", e);
    }

    // Merge in-memory users with DB users
    const allUsersMap = new Map<string, any>();
    
    usersStore.forEach(u => {
      allUsersMap.set(u.id, {
        id: u.id,
        fullName: u.fullName,
        email: u.email,
        role: u.role,
        isActive: u.isActive,
        createdAt: u.createdAt
      });
    });

    dbUsers.forEach(u => {
      if (!allUsersMap.has(u.id)) {
        allUsersMap.set(u.id, {
          id: u.id,
          fullName: u.fullName,
          email: u.email || `${u.fullName.toLowerCase().replace(/\s+/g, '.')}@donnvay.com`,
          role: u.role || "Editor",
          isActive: u.isActive !== false,
          createdAt: u.createdAt || new Date().toISOString()
        });
      }
    });

    res.json(Array.from(allUsersMap.values()));
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
      res.status(400).json({ error: "Full Name, Email, and Password are required" });
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existing = usersStore.find(u => u.email.toLowerCase().trim() === normalizedEmail);
    if (existing) {
      res.status(400).json({ error: "A user with this email address already exists." });
      return;
    }

    const authId = crypto.randomUUID();

    try {
      await db.insert(dashboardUsersTable).values({
        id: authId,
        fullName,
        role: role || 'Editor',
        isActive: true
      });
    } catch (e) {
      console.warn("DB user insert skipped:", e);
    }

    const newUser: UserRecord = {
      id: authId,
      fullName,
      email: normalizedEmail,
      password,
      role: role || 'Editor',
      isActive: true,
      createdAt: new Date().toISOString()
    };

    usersStore.push(newUser);

    res.json({
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
      isActive: newUser.isActive,
      createdAt: newUser.createdAt
    });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ error: "Internal Server Error", details: (error as any).message });
  }
});

// Admin User Login endpoint
router.post("/login", async (req: any, res: any): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = usersStore.find(u => u.email.toLowerCase().trim() === normalizedEmail);

    if (!user || user.password !== password) {
      res.status(401).json({ error: "Invalid email address or password" });
      return;
    }

    if (!user.isActive) {
      res.status(403).json({ error: "Your account is suspended. Please contact administrator." });
      return;
    }

    res.json({
      success: true,
      token: `admin-token-${user.id}-${Date.now()}`,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a user (e.g. role, active status)
router.patch("/users/:id", async (req: any, res: any): Promise<void> => {
  try {
    const { id } = req.params;
    const { role, isActive } = req.body;
    
    const localUser = usersStore.find(u => u.id === id);
    if (localUser) {
      if (role !== undefined) localUser.role = role;
      if (isActive !== undefined) localUser.isActive = isActive;
    }

    try {
      const updateData: any = {};
      if (role !== undefined) updateData.role = role;
      if (isActive !== undefined) updateData.isActive = isActive;

      await db.update(dashboardUsersTable)
        .set(updateData)
        .where(eq(dashboardUsersTable.id, id));
    } catch (e) {
      console.warn("DB user update skipped:", e);
    }

    res.json({
      id: id,
      fullName: localUser?.fullName || "User",
      email: localUser?.email || "",
      role: localUser?.role || role || "Editor",
      isActive: localUser?.isActive !== undefined ? localUser.isActive : (isActive !== undefined ? isActive : true)
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a user
router.delete("/users/:id", async (req: any, res: any): Promise<void> => {
  try {
    const { id } = req.params;
    const index = usersStore.findIndex(u => u.id === id);
    if (index !== -1) {
      usersStore.splice(index, 1);
    }

    try {
      await db.delete(dashboardUsersTable).where(eq(dashboardUsersTable.id, id));
    } catch (e) {
      console.warn("DB user delete skipped:", e);
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
