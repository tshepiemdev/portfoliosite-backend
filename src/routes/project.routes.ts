import { Router } from "express";
import {
  getProjects,
  getProjectBySlug,
  incrementProjectViews,
} from "../controllers/project.controller";

const router = Router();

router.get("/", getProjects);
router.post("/:slug/view", incrementProjectViews);
router.get("/:slug", getProjectBySlug);

export default router;