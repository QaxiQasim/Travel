// @ts-nocheck
import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import adminRouter from "./admin.js";
import activitiesRouter from "./activities.js";
import chauffeurRouter from "./chauffeur.js";
import bookingsRouter from "./bookings.js";

import packagesRouter from "./packages.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(packagesRouter);
router.use("/admin", adminRouter);
router.use("/activities", activitiesRouter);
router.use("/chauffeur", chauffeurRouter);
router.use("/bookings", bookingsRouter);

export default router;
