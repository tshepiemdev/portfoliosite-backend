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

  const failedStatuses = ["bounced", "failed", "complained"];

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
