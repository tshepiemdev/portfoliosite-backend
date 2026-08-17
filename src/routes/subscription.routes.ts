import { Router } from "express";
import {
  subscribe,
  verifySubscription,
  unsubscribe,
  getSubscriptionCount,
  getEmailStatus,
} from "../controllers/subscription.controller";
import { subscriptionRateLimit } from "../middleware/subscriptionRateLimit";
import { honeypotCheck } from "../middleware/honeypot.middleware";
import { validateSubscription } from "../middleware/validateSubscription";
import { verifyTurnstile } from "../middleware/turnstile.middleware";
import { getSubscriptionEmailStatus } from "../controllers/emailEvent.controller";

const router = Router();

router.post(
  "/",
  subscriptionRateLimit,
  honeypotCheck,
  validateSubscription,
  verifyTurnstile,
  subscribe,
);

router.get("/email-status/:emailId", getEmailStatus);

router.get("/verify/:token", verifySubscription);

router.get("/unsubscribe/:token", unsubscribe);

router.get("/count", getSubscriptionCount);

router.get("/email-status/:emailId", getSubscriptionEmailStatus);

export default router;
