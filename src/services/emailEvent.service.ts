import EmailEvent from "../models/emailEvent.model";
import Subscription from "../models/subscription.model";
import Contact from "../models/contact.model";
import ServiceRequest from "../models/ServiceRequest.model";

export type EmailEventStatus =
  | "sent"
  | "delivered"
  | "delivery_delayed"
  | "bounced"
  | "failed"
  | "complained";

export const handleEmailEvent = async (
  emailId: string,
  status: EmailEventStatus,
) => {
  const emailEvent = await EmailEvent.findOne({
    resendEmailId: emailId,
  });

  if (!emailEvent) {
    return null;
  }

  emailEvent.status = status;

  await emailEvent.save();

  const subscriptionPurposes = [
    "subscription_verification",
    "subscription_confirmation",
  ];

  const failedStatuses: EmailEventStatus[] = [
    "bounced",
    "failed",
    "complained",
  ];

  if (
    subscriptionPurposes.includes(emailEvent.purpose) &&
    failedStatuses.includes(status)
  ) {
    const subscription = await Subscription.findOne({
      email: emailEvent.recipient,
    });

    if (subscription) {
      subscription.isActive = false;
      await subscription.save();
    }
  }

  if (
    emailEvent.purpose === "contact_notification" ||
    emailEvent.purpose === "contact_confirmation"
  ) {
    const contact = await Contact.findOne({
      $or: [
        { adminEmailId: emailId },
        { confirmationEmailId: emailId },
      ],
    });

    if (contact) {
      if (contact.adminEmailId === emailId) {
        contact.adminEmailStatus = status;
      }

      if (contact.confirmationEmailId === emailId) {
        contact.confirmationEmailStatus = status;
      }

      await contact.save();
    }
  }

  if (
    emailEvent.purpose === "service_notification" ||
    emailEvent.purpose === "service_confirmation"
  ) {
    const serviceRequest = await ServiceRequest.findOne({
      $or: [
        { adminEmailId: emailId },
        { confirmationEmailId: emailId },
      ],
    });

    if (serviceRequest) {
      if (serviceRequest.adminEmailId === emailId) {
        serviceRequest.adminEmailStatus = status;
      }

      if (serviceRequest.confirmationEmailId === emailId) {
        serviceRequest.confirmationEmailStatus = status;
      }

      await serviceRequest.save();
    }
  }

  return emailEvent;
};

export const getEmailEventStatus = async (emailId: string) => {
  const emailEvent = await EmailEvent.findOne({
    resendEmailId: emailId,
  }).select("status purpose recipient");

  if (!emailEvent) {
    return null;
  }

  return emailEvent;
};