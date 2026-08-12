import { Request, Response } from "express";
import { render } from "@react-email/render";
import * as React from "react";
import { getResend } from "../services/email.service";
import ServiceRequest from "../models/ServiceRequest.model";
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

export const getServiceRequestStatus = async (req: Request, res: Response) => {
  try {
    const { mail_ref } = req.params;

    if (!mail_ref) {
      return res.status(400).json({
        success: false,
        message: "Missing request reference",
      });
    }

    const serviceRequest = await ServiceRequest.findOne({
      mail_ref,
    }).select("confirmationEmailStatus");

    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: "Service request not found",
      });
    }

    return res.status(200).json({
      success: true,
      status: serviceRequest.confirmationEmailStatus,
    });
  } catch (error) {
    console.error("GET /service-request/status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to check service request status",
    });
  }
};

export const serviceRequestWebhook = async (req: Request, res: Response) => {
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

    const status = eventType.replace("email.", "");

    const serviceRequest = await ServiceRequest.findOne({
      $or: [{ adminEmailId: emailId }, { confirmationEmailId: emailId }],
    });

    if (!serviceRequest) {
      return res.status(200).json({
        success: true,
      });
    }

    if (serviceRequest.adminEmailId === emailId) {
      serviceRequest.adminEmailStatus = status;
    }

    if (serviceRequest.confirmationEmailId === emailId) {
      serviceRequest.confirmationEmailStatus = status;
    }

    await serviceRequest.save();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("POST /service-request/webhook error:", error);

    return res.status(500).json({
      success: false,
      message: "Webhook processing failed",
    });
  }
};
