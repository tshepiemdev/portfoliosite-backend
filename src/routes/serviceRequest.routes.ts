import { Router } from "express";
import { sendServiceRequestEmails } from "../controllers/serviceRequest.controller";
import { contactRateLimit } from "../middleware/rateLimit.middleware";
import { honeypotCheck } from "../middleware/honeypot.middleware";
import { verifyTurnstile } from "../middleware/turnstile.middleware";
import { validateServiceRequest } from "../middleware/validateServiceRequest.middleware";

const router = Router();

router.post(
  "/",
  contactRateLimit,
  honeypotCheck,
  verifyTurnstile,
  validateServiceRequest,
  sendServiceRequestEmails,
);

export default router;
