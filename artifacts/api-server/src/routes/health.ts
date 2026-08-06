import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/", (req: any, res: any) => {
  const url = process.env.DATABASE_URL || "NOT SET";
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    dbUrlPrefix: url.substring(0, 30)
  });
});

router.get("/healthz", (req: any, res: any) => {
  res.send("ok");
});

export default router;
