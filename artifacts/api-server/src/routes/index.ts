import { Router, type IRouter } from "express";
import healthRouter from "./health";
import packagesRouter from "./packages";
import enquiriesRouter from "./enquiries";

const router: IRouter = Router();

router.use(healthRouter);
router.use(packagesRouter);
router.use(enquiriesRouter);

export default router;
