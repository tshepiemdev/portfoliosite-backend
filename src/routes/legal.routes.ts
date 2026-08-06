import { Router } from "express";
import { getLegals, getLegalBySlug } from "../controllers/legal.controller";

const router = Router();

router.get("/", getLegals);

router.get("/:slug", getLegalBySlug);

export default router;
