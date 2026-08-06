import { Router } from "express";
import { getPricings } from "../controllers/pricing.controller";

const router = Router();

router.get("/", getPricings);

export default router;