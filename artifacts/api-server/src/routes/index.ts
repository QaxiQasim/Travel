// @ts-nocheck
import { Router, type IRouter } from "express";
import healthRouter from "./health";
import packagesRouter from "./packages";
import enquiriesRouter from "./enquiries";
import adminRouter from "./admin";
import activitiesRouter from "./activities";
import chauffeurRatesRouter from "./chauffeur_rates";

const router: IRouter = Router();

router.use(healthRouter);
router.use(packagesRouter);
router.use(enquiriesRouter);
router.use("/admin", adminRouter);
router.use("/activities", activitiesRouter);
router.use("/chauffeur-rates", chauffeurRatesRouter);

export default router;
