import { Request, Response } from "express";
import Subscription from "../models/subscription.model";
import EmailEvent from "../models/emailEvent.model";
import {
  createSubscription,
  verifySubscriptionToken,
  unsubscribeSubscription,
} from "../services/subscription.service";

export const subscribe = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const result = await createSubscription(email);

    return res.status(201).json({
      success: true,
      message: "Please check your email to confirm your subscription.",
      emailId: result.emailId,
    });
  } catch (error) {
    console.error("POST /subscriptions error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "We couldn't send the verification email. Please try again later.";

    if (message === "This email is already subscribed.") {
      return res.status(409).json({
        success: false,
        message,
      });
    }

    if (message === "Please enter a valid email address.") {
      return res.status(400).json({
        success: false,
        message,
      });
    }

    return res.status(500).json({
      success: false,
      message,
    });
  }
};

export const getEmailStatus = async (req: Request, res: Response) => {
  try {
    const { emailId } = req.params;

    if (!emailId || typeof emailId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid email ID.",
      });
    }

    const emailEvent = await EmailEvent.findOne({
      resendEmailId: emailId,
    }).select("status purpose recipient");

    if (!emailEvent) {
      return res.status(404).json({
        success: false,
        message: "Email status not found.",
      });
    }

    return res.status(200).json({
      success: true,
      status: emailEvent.status,
      purpose: emailEvent.purpose,
      recipient: emailEvent.recipient,
    });
  } catch (error) {
    console.error("GET /subscriptions/email-status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to check email status.",
    });
  }
};

export const verifySubscription = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    if (typeof token !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid verification token",
      });
    }

    const subscription = await verifySubscriptionToken(token);

    return res.status(200).json({
      success: true,
      message: subscription.alreadyVerified
        ? "Your subscription is already verified."
        : "Your subscription has been confirmed.",
      data: subscription,
    });
  } catch (error) {
    console.error("GET /subscriptions/verify error:", error);

    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Verification failed",
    });
  }
};

export const unsubscribe = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    if (typeof token !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid unsubscribe token",
      });
    }

    const subscription = await unsubscribeSubscription(token);

    return res.status(200).json({
      success: true,
      message: "You have been unsubscribed successfully.",
      data: subscription,
    });
  } catch (error) {
    console.error("GET /subscriptions/unsubscribe error:", error);

    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Unsubscribe failed",
    });
  }
};

export const getSubscriptionCount = async (_req: Request, res: Response) => {
  try {
    const count = await Subscription.countDocuments({
      verified: true,
      isActive: true,
    });

    return res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("GET /subscriptions/count error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch subscription count",
    });
  }
};
