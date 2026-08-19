import EmailEvent from "../models/emailEvent.model";
import Subscription from "../models/subscription.model";

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
