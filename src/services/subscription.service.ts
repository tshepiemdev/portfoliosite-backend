import { render } from "@react-email/render";
import * as React from "react";
import { getResend } from "./email.service";
import Subscription from "../models/subscription.model";
import SubscriptionVerification from "../emails/templates/SubscriptionVerification";
import SubscriptionConfirmation from "../emails/templates/SubscriptionConfirmation";
import { generateToken } from "../utils/generateToken";

export const createSubscription = async (email: string) => {
  const resend = getResend();

  const cleanEmail = email.toLowerCase().trim();

  const verificationToken = generateToken();
  const unsubscribeToken = generateToken();

  let subscription = await Subscription.findOne({
    email: cleanEmail,
  });

  if (!subscription) {
    subscription = new Subscription({
      email: cleanEmail,
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

  if (resendResponse.error) {
    throw new Error(resendResponse.error.message);
  }

  return subscription;
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

    if (resendResponse.error) {
      console.error(
        "Subscription confirmation email failed:",
        resendResponse.error,
      );
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
