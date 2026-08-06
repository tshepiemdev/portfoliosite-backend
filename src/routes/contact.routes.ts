import { Router } from "express";
import { sendContactEmails } from "../controllers/contact.controller";
import { contactRateLimit } from "../middleware/rateLimit.middleware";
import { validateContact } from "../middleware/validateContact.middleware";
import { honeypotCheck } from "../middleware/honeypot.middleware";
import { verifyCaptcha } from "../middleware/captcha.middleware";

const router = Router();

router.post(
  "/",
  contactRateLimit,
  honeypotCheck,
  verifyCaptcha,
  validateContact,
  sendContactEmails,
);

export default router;
