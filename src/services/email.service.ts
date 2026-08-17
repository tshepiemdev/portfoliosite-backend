import { render } from "@react-email/render";
import * as React from "react";
import { Resend } from "resend";
import SubscriptionConfirmation from "../emails/templates/SubscriptionConfirmation";
import SubscriptionVerification from "../emails/templates/SubscriptionVerification";

let resend: Resend;

export const getResend = (): Resend => {
  if (!resend) {
    const key = process.env.RESEND_API_KEY;

    if (!key) {
      throw new Error("RESEND_API_KEY is missing");
    }

    resend = new Resend(key);
  }

  return resend;
};

export const sendSubscriptionVerificationEmail = async ({
  email,
  verifyUrl,
  unsubscribeUrl,
}: {
  email: string;
  verifyUrl: string;
  unsubscribeUrl: string;
}) => {
  const html = await render(
    React.createElement(SubscriptionVerification, {
      data: {
        email,
        verifyUrl,
        unsubscribeUrl,
      },
    }),
  );

  return getResend().emails.send({
    from: "tshepiem.dev <newsletter@tshepiem.dev>",
    to: email,
    subject: "Confirm Your Blog Subscription",
    html,
  });
};

export const sendSubscriptionConfirmationEmail = async ({
  email,
  unsubscribeUrl,
}: {
  email: string;
  unsubscribeUrl: string;
}) => {
  const html = await render(
    React.createElement(SubscriptionConfirmation, {
      data: {
        email,
        unsubscribeUrl,
      },
    }),
  );

  return getResend().emails.send({
    from: "tshepiem.dev <newsletter@tshepiem.dev>",
    to: email,
    subject: "Congratulations! Your Blog Subscription Is Now Active",
    html,
  });
};
