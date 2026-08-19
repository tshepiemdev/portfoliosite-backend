import { Request, Response } from "express";
import Contact from "../models/contact.model";
import EmailEvent from "../models/emailEvent.model";
import { createContact } from "../services/contact.service";

export const sendContactEmails = async (req: Request, res: Response) => {
  try {
    const result = await createContact(req.body);

    if (!result.confirmationSent) {
      return res.status(200).json({
        success: true,
        message:
          "Your message was sent successfully, but we couldn't send the confirmation email.",
        mail_ref: result.contact.mail_ref,
        emailId: result.emailId,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your message was sent successfully.",
      mail_ref: result.contact.mail_ref,
      emailId: result.emailId,
      confirmationEmailId: result.confirmationEmailId,
    });
  } catch (error) {
    console.error("POST /contact error:", error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "We couldn't send your message. Please try again later.",
    });
  }
};

export const getContactEmailStatus = async (req: Request, res: Response) => {
  try {
    const { mail_ref } = req.params;

    if (!mail_ref || typeof mail_ref !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid mail reference.",
      });
    }

    const contact = await Contact.findOne({
      mail_ref,
    }).select("mail_ref adminEmailId confirmationEmailId");

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    const emailIds = [contact.adminEmailId, contact.confirmationEmailId].filter(
      (id): id is string => Boolean(id),
    );

    const emailEvents = await EmailEvent.find({
      resendEmailId: { $in: emailIds },
    }).select("resendEmailId purpose status");

    const adminEvent = emailEvents.find(
      (event) => event.resendEmailId === contact.adminEmailId,
    );

    const confirmationEvent = emailEvents.find(
      (event) => event.resendEmailId === contact.confirmationEmailId,
    );

    return res.status(200).json({
      success: true,
      mail_ref: contact.mail_ref,
      adminEmailStatus: adminEvent?.status || null,
      confirmationEmailStatus: confirmationEvent?.status || null,
    });
  } catch (error) {
    console.error("GET /contact/status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve email status.",
    });
  }
};
