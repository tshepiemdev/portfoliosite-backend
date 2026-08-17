import { Request, Response, NextFunction } from "express";
import { getResend } from "../services/email.service";

export const verifyResendWebhook = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("RESEND_WEBHOOK_SECRET is missing");

      return res.status(500).json({
        success: false,
        message: "Webhook configuration error",
      });
    }

    const resend = getResend();

    const event = resend.webhooks.verify({
      payload: req.body.toString("utf8"),
      headers: {
        id: req.headers["svix-id"] as string,
        timestamp: req.headers["svix-timestamp"] as string,
        signature: req.headers["svix-signature"] as string,
      },
      webhookSecret,
    });

    req.body = event;

    next();
  } catch (error) {
    console.error("Resend webhook verification failed:", error);

    return res.status(400).json({
      success: false,
      message: "Invalid webhook signature",
    });
  }
};
