import { Request, Response } from "express";
import { render } from "@react-email/render";
import * as React from "react";
import { getResend } from "../services/email.service";
import ServiceRequest from "../models/ServiceRequest";
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

    const serviceRequest = await ServiceRequest.create({
      mail_ref: serviceRequestData.mail_ref,
      firstName: serviceRequestData.firstName,
      lastName: serviceRequestData.lastName,
      email: serviceRequestData.email,
      phone: serviceRequestData.phone || "",
      country: serviceRequestData.country,
      company: serviceRequestData.company || "",
      service: serviceRequestData.service,
      package: serviceRequestData.package || "",
      price: serviceRequestData.price ?? null,
      pricingType: serviceRequestData.pricingType,
      budget: serviceRequestData.budget,
      startTime: serviceRequestData.startTime,
      message: serviceRequestData.message || "",
    });

    const adminHtml = await render(
      React.createElement(ServiceRequestForm, {
        data: serviceRequestData,
      }),
    );

    const adminResult = await resend.emails.send({
      from: "tshepiem.dev <services@tshepiem.dev>",
      to: process.env.DEV_SERVICE_EMAIL!,
      subject: `New Service Request - Reference ${serviceRequestData.mail_ref}`,
      html: adminHtml,
    });

    if (adminResult.error || !adminResult.data?.id) {
      await ServiceRequest.findByIdAndUpdate(serviceRequest._id, {
        adminEmailStatus: "failed",
      });

      console.error("Service request admin email error:", adminResult.error);

      return res.status(500).json({
        success: false,
        message: "Failed to send service request emails",
      });
    }

    await ServiceRequest.findByIdAndUpdate(serviceRequest._id, {
      adminEmailId: adminResult.data.id,
      adminEmailStatus: "sent",
    });

    const userHtml = await render(
      React.createElement(ServiceRequestConfirmationForm, {
        data: serviceRequestData,
      }),
    );

    const userResult = await resend.emails.send({
      from: "tshepiem.dev <services@tshepiem.dev>",
      to: serviceRequestData.email,
      subject: `Your Service Request Was Received - Reference ${serviceRequestData.mail_ref}`,
      html: userHtml,
    });

    if (userResult.error || !userResult.data?.id) {
      await ServiceRequest.findByIdAndUpdate(serviceRequest._id, {
        confirmationEmailStatus: "failed",
      });

      console.error(
        "Service request confirmation email error:",
        userResult.error,
      );

      return res.status(500).json({
        success: false,
        message: "We couldn't send the confirmation email.",
      });
    }

    await ServiceRequest.findByIdAndUpdate(serviceRequest._id, {
      confirmationEmailId: userResult.data.id,
      confirmationEmailStatus: "sent",
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
