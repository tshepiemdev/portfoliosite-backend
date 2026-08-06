import { Router } from "express";
import { getHelpCenters } from "../controllers/helpcenter.controller";

const router = Router();

router.get("/", getHelpCenters);

export default router;
