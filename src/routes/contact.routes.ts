import { Router } from "express";
import {
  sendContactEmails,
  contactWebhook,
} from "../controllers/contact.controller";
import { contactRateLimit } from "../middleware/rateLimit.middleware";
import { validateContact } from "../middleware/validateContact.middleware";
import { honeypotCheck } from "../middleware/honeypot.middleware";
import { verifyTurnstile } from "../middleware/turnstile.middleware";

const router = Router();

router.post(
  "/",
  contactRateLimit,
  honeypotCheck,
  verifyTurnstile,
  validateContact,
  sendContactEmails,
);

router.post("/webhook", contactWebhook);

export default router;
