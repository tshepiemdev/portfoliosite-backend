import { Request, Response } from "express";
import { render } from "@react-email/render";
import * as React from "react";
import { getResend } from "../services/email.service";
import ServiceRequestForm from "../emails/templates/ServiceRequestForm";
import ServiceRequestConfirmationForm from "../emails/templates/ServiceRequestConfirmationForm";

export const sendServiceRequestEmails = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const resend = getResend();

    const serviceRequestData = {
      ...data,
      serviceType: data.serviceType || "",
      pricingAlias: data.pricingAlias || "",
      packageType: data.packageType || "",
      pricingType: data.pricingType || "custom",
    };

    const adminHtml = await render(
      React.createElement(ServiceRequestForm, {
        data: serviceRequestData,
      }),
    );

    await resend.emails.send({
      from: "tshepiem.dev <services@tshepiem.dev>",
      to: process.env.DEV_SERVICE_EMAIL!,
      subject: `New Service Request - Reference ${serviceRequestData.mail_ref}`,
      html: adminHtml,
    });

    const userHtml = await render(
      React.createElement(ServiceRequestConfirmationForm, {
        data: serviceRequestData,
      }),
    );

    await resend.emails.send({
      from: "tshepiem.dev <services@tshepiem.dev>",
      to: serviceRequestData.email,
      subject: `Your Service Request Was Received - Reference ${serviceRequestData.mail_ref}`,
      html: userHtml,
    });

    return res.status(200).json({
      success: true,
      message: "Service request emails sent successfully",
    });
  } catch (err) {
    console.error("Service request email error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to send service request emails",
    });
  }
};
