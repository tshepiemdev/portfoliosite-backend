import { Router } from "express";
import {
  sendContactEmails,
  getContactEmailStatus,
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

router.get("/status/:mail_ref", getContactEmailStatus);

export default router;
