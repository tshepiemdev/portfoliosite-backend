import { render } from "@react-email/render";
import * as React from "react";
import ServiceRequest from "../models/ServiceRequest.model";
import EmailEvent from "../models/emailEvent.model";
import ServiceRequestForm from "../emails/templates/ServiceRequestForm";
import ServiceRequestConfirmationForm from "../emails/templates/ServiceRequestConfirmationForm";
import { getResend } from "./email.service";

export const createServiceRequest = async (data: any) => {
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

  const resend = getResend();

  const adminHtml = await render(
    React.createElement(ServiceRequestForm, {
      data: serviceRequestData,
    }),
  );

  const adminResponse = await resend.emails.send({
    from: "tshepiem.dev <services@tshepiem.dev>",
    to: process.env.DEV_SERVICE_EMAIL!,
    subject: "New Service Request",
    html: adminHtml,
  });

  if (adminResponse.error || !adminResponse.data?.id) {
    serviceRequest.adminEmailStatus = "failed";
    await serviceRequest.save();

    throw new Error(
      "We couldn't send your service request. Please try again later.",
    );
  }

  serviceRequest.adminEmailId = adminResponse.data.id;
  serviceRequest.adminEmailStatus = "sent";
  await serviceRequest.save();

  await EmailEvent.create({
    resendEmailId: adminResponse.data.id,
    purpose: "service_notification",
    recipient: process.env.DEV_SERVICE_EMAIL!,
    status: "sent",
  });

  const confirmationHtml = await render(
    React.createElement(ServiceRequestConfirmationForm, {
      data: serviceRequestData,
    }),
  );

  const confirmationResponse = await resend.emails.send({
    from: "tshepiem.dev <services@tshepiem.dev>",
    to: serviceRequestData.email,
    subject: "Your Service Request Was Received",
    html: confirmationHtml,
  });

  if (confirmationResponse.error || !confirmationResponse.data?.id) {
    serviceRequest.confirmationEmailStatus = "failed";
    await serviceRequest.save();

    throw new Error(
      "Your service request was received, but we couldn't send the confirmation email.",
    );
  }

  serviceRequest.confirmationEmailId = confirmationResponse.data.id;
  serviceRequest.confirmationEmailStatus = "sent";
  await serviceRequest.save();

  await EmailEvent.create({
    resendEmailId: confirmationResponse.data.id,
    purpose: "service_confirmation",
    recipient: serviceRequestData.email,
    status: "sent",
  });

  return {
    serviceRequest,
    mail_ref: serviceRequest.mail_ref,
    adminEmailId: adminResponse.data.id,
    confirmationEmailId: confirmationResponse.data.id,
  };
};

export const getServiceRequestEmailStatus = async (mail_ref: string) => {
  const serviceRequest = await ServiceRequest.findOne({
    mail_ref,
  }).select("mail_ref adminEmailStatus confirmationEmailStatus");

  if (!serviceRequest) {
    return null;
  }

  return {
    mail_ref: serviceRequest.mail_ref,
    adminEmailStatus: serviceRequest.adminEmailStatus,
    confirmationEmailStatus: serviceRequest.confirmationEmailStatus,
  };
};
