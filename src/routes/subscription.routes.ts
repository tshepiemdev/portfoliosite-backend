import { Router } from "express";
import {
  subscribe,
  verifySubscription,
  unsubscribe,
  getSubscriptionCount,
} from "../controllers/subscription.controller";
import { subscriptionRateLimit } from "../middleware/subscriptionRateLimit";
import { honeypotCheck } from "../middleware/honeypot.middleware";
import { validateSubscription } from "../middleware/validateSubscription";

const router = Router();

router.post(
  "/",
  subscriptionRateLimit,
  honeypotCheck,
  validateSubscription,
  subscribe,
);

router.get("/verify/:token", verifySubscription);
router.get("/unsubscribe/:token", unsubscribe);
router.get("/count", getSubscriptionCount);
export default router;
