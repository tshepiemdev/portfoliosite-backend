import { Request, Response } from "express";
import { getEmailEventStatus } from "../services/emailEvent.service";

export const getSubscriptionEmailStatus = async (
  req: Request,
  res: Response,
) => {
  try {
    const { emailId } = req.params;

    if (typeof emailId !== "string" || !emailId) {
      return res.status(400).json({
        success: false,
        message: "Invalid email ID",
      });
    }

    const status = await getEmailEventStatus(emailId);

    if (!status) {
      return res.status(404).json({
        success: false,
        message: "Email event not found",
      });
    }

    return res.status(200).json({
      success: true,
      status,
    });
  } catch (error) {
    console.error("GET /subscriptions/email-status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch email status",
    });
  }
};
