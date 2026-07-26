import { Router, type IRouter } from "express";
import {
  packages,
  activities,
  testimonials,
} from "../data/packages.js";

const router: IRouter = Router();

// GET /packages — list all packages, optionally filtered by category or featured
router.get("/packages", async (req: any, res: any): Promise<void> => {
  const { category, featured } = req.query;
  let result = [...packages];

  if (category && typeof category === "string") {
    result = result.filter((p) => p.category === category);
  }

  if (featured === "true") {
    result = result.filter((p) => p.isFeatured);
  }

  res.json(result);
});

// GET /packages/featured — featured packages for home page
router.get("/packages/featured", async (_req: any, res: any): Promise<void> => {
  const featured = packages.filter((p) => p.isFeatured);
  res.json(featured);
});

// GET /packages/:slug — get a specific package
router.get("/packages/:slug", async (req: any, res: any): Promise<void> => {
  const { slug } = req.params;
  const pkg = packages.find((p) => p.slug === slug);
  if (!pkg) {
    res.status(404).json({ error: "Package not found" });
    return;
  }
  res.json(pkg);
});

// GET /activities — list all activities
router.get("/activities", async (_req: any, res: any): Promise<void> => {
  res.json(activities);
});

// GET /activities/:slug — get a specific activity
router.get("/activities/:slug", async (req: any, res: any): Promise<void> => {
  const { slug } = req.params;
  const activity = activities.find((a) => a.slug === slug);
  if (!activity) {
    res.status(404).json({ error: "Activity not found" });
    return;
  }
  res.json(activity);
});

// GET /testimonials — get customer testimonials
router.get("/testimonials", async (_req: any, res: any): Promise<void> => {
  res.json(testimonials);
});

export default router;
