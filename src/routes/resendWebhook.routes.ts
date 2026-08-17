import { Router } from "express";
import { resendWebhook } from "../controllers/resendWebhook.controller";
import { verifyResendWebhook } from "../middleware/resendWebhook.middleware";

const router = Router();

router.post("/", verifyResendWebhook, resendWebhook);

export default router;
