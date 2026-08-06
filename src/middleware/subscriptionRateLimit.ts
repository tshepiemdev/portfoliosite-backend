import rateLimit from "express-rate-limit";

export const subscriptionRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many subscription attempts. Please try again later.",
  },
});