import { Request, Response } from "express";
import {
  createServiceRequest,
  getServiceRequestEmailStatus,
} from "../services/serviceRequest.service";

export const sendServiceRequestEmails = async (req: Request, res: Response) => {
  try {
    const result = await createServiceRequest(req.body);

    return res.status(200).json({
      success: true,
      message: "Your service request was sent successfully.",
      mail_ref: result.mail_ref,
      emailId: result.confirmationEmailId,
    });
  } catch (error) {
    console.error("POST /service-request error:", error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "We couldn't send your service request. Please try again later.",
    });
  }
};

export const getServiceRequestStatus = async (req: Request, res: Response) => {
  try {
    const { mail_ref } = req.params;

    if (!mail_ref || typeof mail_ref !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid request reference.",
      });
    }

    const result = await getServiceRequestEmailStatus(mail_ref);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Service request not found.",
      });
    }

    return res.status(200).json({
      success: true,
      mail_ref: result.mail_ref,
      adminEmailStatus: result.adminEmailStatus,
      confirmationEmailStatus: result.confirmationEmailStatus,
    });
  } catch (error) {
    console.error("GET /service-request/status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve service request status.",
    });
  }
};
