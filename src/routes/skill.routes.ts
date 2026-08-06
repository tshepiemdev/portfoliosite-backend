import { Router } from "express";
import { getSkills } from "../controllers/skill.controller";

const router = Router();

router.get("/", getSkills);

export default router;
