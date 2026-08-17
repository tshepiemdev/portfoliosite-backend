import { render } from "@react-email/render";
import * as React from "react";
import { getResend } from "./email.service";
import Subscription from "../models/subscription.model";
import EmailEvent from "../models/emailEvent.model";
import SubscriptionVerification from "../emails/templates/SubscriptionVerification";
import SubscriptionConfirmation from "../emails/templates/SubscriptionConfirmation";
import { generateToken } from "../utils/generateToken";

export const createSubscription = async (email: string) => {
  const resend = getResend();

  const cleanEmail = email.toLowerCase().trim();

  let subscription = await Subscription.findOne({
    email: cleanEmail,
  });

  if (subscription?.verified && subscription.isActive) {
    throw new Error("This email is already subscribed.");
  }

  const verificationToken = generateToken();
  const unsubscribeToken = generateToken();

  if (!subscription) {
    subscription = new Subscription({
      email: cleanEmail,
      unsubscribeToken,
    });
  }

  subscription.unsubscribeToken = unsubscribeToken;
  subscription.verificationToken = verificationToken;
  subscription.verificationExpires = new Date(Date.now() + 1000 * 60 * 60 * 24);
  subscription.verified = false;
  subscription.verificationTokenUsed = false;
  subscription.isActive = true;

  await subscription.save();

  const verifyUrl = `${process.env.FRONTEND_URL}/subscribe/verify/${verificationToken}`;
  const unsubscribeUrl = `${process.env.FRONTEND_URL}/subscribe/unsubscribe/${unsubscribeToken}`;

  const html = await render(
    React.createElement(SubscriptionVerification, {
      data: {
        email: cleanEmail,
        verifyUrl,
        unsubscribeUrl,
      },
    }),
  );

  const resendResponse = await resend.emails.send({
    from: "tshepiem.dev <newsletter@tshepiem.dev>",
    to: cleanEmail,
    subject: "Confirm Your Blog Subscription",
    html,
  });

  if (resendResponse.error || !resendResponse.data?.id) {
    throw new Error(
      "We couldn't send the verification email. Please try again later.",
    );
  }

  await EmailEvent.create({
    resendEmailId: resendResponse.data.id,
    purpose: "subscription_verification",
    recipient: cleanEmail,
    status: "sent",
  });

  return {
    subscription,
    emailId: resendResponse.data.id,
  };
};

export const verifySubscriptionToken = async (token: string) => {
  const resend = getResend();

  const subscription = await Subscription.findOne({
    verificationToken: token,
  });

  if (!subscription) {
    throw new Error("Invalid verification link");
  }

  if (
    subscription.verificationExpires &&
    subscription.verificationExpires < new Date()
  ) {
    throw new Error("Verification link has expired");
  }

  if (subscription.verified) {
    return {
      alreadyVerified: true,
      email: subscription.email,
    };
  }

  subscription.verified = true;
  subscription.subscribedAt = new Date();
  subscription.verificationTokenUsed = true;
  subscription.verificationToken = undefined;
  subscription.verificationExpires = undefined;
  subscription.isActive = true;

  await subscription.save();

  try {
    const unsubscribeUrl = `${process.env.FRONTEND_URL}/subscribe/unsubscribe/${subscription.unsubscribeToken}`;

    const html = await render(
      React.createElement(SubscriptionConfirmation, {
        data: {
          email: subscription.email,
          unsubscribeUrl,
        },
      }),
    );

    const resendResponse = await resend.emails.send({
      from: "tshepiem.dev <newsletter@tshepiem.dev>",
      to: subscription.email,
      subject: "Congratulations! Your Blog Subscription Is Now Active",
      html,
    });

    if (!resendResponse.error && resendResponse.data?.id) {
      await EmailEvent.create({
        resendEmailId: resendResponse.data.id,
        purpose: "subscription_confirmation",
        recipient: subscription.email,
        status: "sent",
      });
    }
  } catch (error) {
    console.error("Subscription confirmation email error:", error);
  }

  return {
    alreadyVerified: false,
    email: subscription.email,
  };
};

export const unsubscribeSubscription = async (token: string) => {
  const subscription = await Subscription.findOne({
    unsubscribeToken: token,
  });

  if (!subscription) {
    throw new Error("Invalid unsubscribe link");
  }

  subscription.isActive = false;

  await subscription.save();

  return {
    email: subscription.email,
    isActive: subscription.isActive,
  };
};
