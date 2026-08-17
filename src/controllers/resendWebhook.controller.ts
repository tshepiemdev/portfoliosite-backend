import { Request, Response } from "express";
import { handleEmailEvent } from "../services/emailEvent.service";

export const resendWebhook = async (req: Request, res: Response) => {
  try {
    const event = req.body;

    const eventType = event?.type;
    const emailId = event?.data?.email_id;

    if (!eventType || !emailId) {
      return res.status(400).json({
        success: false,
        message: "Invalid webhook payload",
      });
    }

    const supportedEvents = [
      "email.sent",
      "email.delivered",
      "email.delivery_delayed",
      "email.bounced",
      "email.failed",
      "email.complained",
    ];

    if (!supportedEvents.includes(eventType)) {
      return res.status(200).json({
        success: true,
      });
    }

    const status = eventType.replace("email.", "") as
      | "sent"
      | "delivered"
      | "delivery_delayed"
      | "bounced"
      | "failed"
      | "complained";

    await handleEmailEvent(emailId, status);

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("POST /webhooks/resend error:", error);

    return res.status(500).json({
      success: false,
      message: "Webhook processing failed",
    });
  }
};
