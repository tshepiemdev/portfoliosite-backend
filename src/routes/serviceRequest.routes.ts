import { Router } from "express";
import { sendServiceRequestEmails } from "../controllers/serviceRequest.controller";
import { contactRateLimit } from "../middleware/rateLimit.middleware";
import { honeypotCheck } from "../middleware/honeypot.middleware";
import { verifyCaptcha } from "../middleware/captcha.middleware";
const router = Router();

router.post(
  "/",
  contactRateLimit,
  honeypotCheck,
  verifyCaptcha,
  sendServiceRequestEmails,
);

export default router;
