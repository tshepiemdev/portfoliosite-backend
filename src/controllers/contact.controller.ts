import { Request, Response } from "express";
import { render } from "@react-email/render";
import * as React from "react";
import { getResend } from "../services/email.service";
import GetInTouchForm from "../emails/templates/GetInTouchForm";
import GetInTouchConfirmationForm from "../emails/templates/GetInTouchConfirmationForm";

export const sendContactEmails = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const resend = getResend();

    const adminHtml = await render(
      React.createElement(GetInTouchForm, { data }),
    );

    await resend.emails.send({
      from: "tshepiem.dev <hello@tshepiem.dev>",
      to: process.env.DEV_CONTACT_EMAIL!,
      subject: `New Contact Message - Reference ${data.mail_ref}`,
      html: adminHtml,
    });

    const userHtml = await render(
      React.createElement(GetInTouchConfirmationForm, { data }),
    );

    await resend.emails.send({
      from: "tshepiem.dev <hello@tshepiem.dev>",
      to: data.email,
      subject: `Your Message Was Received - Reference ${data.mail_ref}`,
      html: userHtml,
    });

    return res.status(200).json({
      success: true,
      message: "Emails sent successfully",
    });
  } catch (err) {
    console.error("Contact email error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to send contact emails",
    });
  }
};
