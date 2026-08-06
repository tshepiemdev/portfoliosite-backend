import { Router } from "express";
import { getQualifications } from "../controllers/qualification.controller";

const router = Router();

router.get("/", getQualifications);

export default router;
