import { Router } from "express";
import {
  subscribe,
  verifySubscription,
  unsubscribe,
  getSubscriptionCount,
  subscriptionWebhook,
} from "../controllers/subscription.controller";
import { subscriptionRateLimit } from "../middleware/subscriptionRateLimit";
import { honeypotCheck } from "../middleware/honeypot.middleware";
import { validateSubscription } from "../middleware/validateSubscription";
import { verifyTurnstile } from "../middleware/turnstile.middleware";

const router = Router();

router.post(
  "/",
  subscriptionRateLimit,
  honeypotCheck,
  validateSubscription,
  verifyTurnstile,
  subscribe,
);

router.post("/webhook", subscriptionWebhook);

router.get("/verify/:token", verifySubscription);

router.get("/unsubscribe/:token", unsubscribe);

router.get("/count", getSubscriptionCount);

export default router;
