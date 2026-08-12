import { Request, Response } from "express";
import { render } from "@react-email/render";
import * as React from "react";
import { Webhook } from "svix";
import { getResend } from "../services/email.service";
import Contact from "../models/contact.model";
import GetInTouchForm from "../emails/templates/GetInTouchForm";
import GetInTouchConfirmationForm from "../emails/templates/GetInTouchConfirmationForm";

export const sendContactEmails = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const resend = getResend();

    const contact = await Contact.create({
      mail_ref: data.mail_ref,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      reason: data.reason,
      teamSize: data.teamSize,
      message: data.message,
    });

    const adminHtml = await render(
      React.createElement(GetInTouchForm, { data }),
    );

    const adminResponse = await resend.emails.send({
      from: "tshepiem.dev <hello@tshepiem.dev>",
      to: process.env.DEV_CONTACT_EMAIL!,
      subject: `New Contact Message - Reference ${data.mail_ref}`,
      html: adminHtml,
    });

    if (adminResponse.error || !adminResponse.data?.id) {
      contact.adminEmailStatus = "failed";
      await contact.save();

      return res.status(500).json({
        success: false,
        message: "We couldn't send your message. Please try again later.",
      });
    }

    contact.adminEmailId = adminResponse.data.id;
    contact.adminEmailStatus = "sent";
    await contact.save();

    const userHtml = await render(
      React.createElement(GetInTouchConfirmationForm, { data }),
    );

    const userResponse = await resend.emails.send({
      from: "tshepiem.dev <hello@tshepiem.dev>",
      to: data.email,
      subject: `Your Message Was Received - Reference ${data.mail_ref}`,
      html: userHtml,
    });

    if (userResponse.error || !userResponse.data?.id) {
      contact.confirmationEmailStatus = "failed";
      await contact.save();

      return res.status(200).json({
        success: true,
        message:
          "Your message was sent successfully, but we couldn't send the confirmation email.",
        mail_ref: data.mail_ref,
      });
    }

    contact.confirmationEmailId = userResponse.data.id;
    contact.confirmationEmailStatus = "sent";
    await contact.save();

    return res.status(200).json({
      success: true,
      message: "Your message was sent successfully.",
      mail_ref: data.mail_ref,
    });
  } catch (error) {
    console.error("Contact email error:", error);

    return res.status(500).json({
      success: false,
      message: "We couldn't send your message. Please try again later.",
    });
  }
};

export const getContactEmailStatus = async (req: Request, res: Response) => {
  try {
    const { mail_ref } = req.params;

    const contact = await Contact.findOne({
      mail_ref,
    }).select("mail_ref confirmationEmailStatus adminEmailStatus");

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    return res.status(200).json({
      success: true,
      mail_ref: contact.mail_ref,
      confirmationEmailStatus: contact.confirmationEmailStatus || null,
      adminEmailStatus: contact.adminEmailStatus || null,
    });
  } catch (error) {
    console.error("Get contact email status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve email status",
    });
  }
};

export const contactWebhook = async (req: Request, res: Response) => {
  try {
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("RESEND_WEBHOOK_SECRET is not configured");

      return res.status(500).json({
        success: false,
        message: "Webhook configuration error",
      });
    }

    const webhook = new Webhook(webhookSecret);

    const payload = Buffer.isBuffer(req.body)
      ? req.body.toString("utf8")
      : JSON.stringify(req.body);

    const event = webhook.verify(
      payload,
      req.headers as Record<string, string>,
    ) as {
      type: string;
      data?: {
        email_id?: string;
      };
    };

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

    const contact = await Contact.findOne({
      $or: [{ adminEmailId: emailId }, { confirmationEmailId: emailId }],
    });

    if (!contact) {
      return res.status(200).json({
        success: true,
      });
    }

    if (contact.adminEmailId === emailId) {
      contact.adminEmailStatus = status;
    }

    if (contact.confirmationEmailId === emailId) {
      contact.confirmationEmailStatus = status;
    }

    await contact.save();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("POST /contact/webhook error:", error);

    return res.status(400).json({
      success: false,
      message: "Invalid webhook signature or payload",
    });
  }
};
