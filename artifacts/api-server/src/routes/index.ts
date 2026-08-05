// @ts-nocheck
import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import packagesRouter from "./packages.js";
import enquiriesRouter from "./enquiries.js";
import adminRouter from "./admin.js";
import activitiesRouter from "./activities.js";
import chauffeurRatesRouter from "./chauffeur_rates.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(packagesRouter);
router.use(enquiriesRouter);
router.use("/admin", adminRouter);
router.use("/activities", activitiesRouter);
router.use("/chauffeur-rates", chauffeurRatesRouter);

export default router;
