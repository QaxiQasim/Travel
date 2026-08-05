// @ts-nocheck
import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/healthz", (_req: any, res: any) => {
  res.json({
    status: "ok",
    hasDbUrl: !!process.env.DATABASE_URL
  });
});

export default router;
