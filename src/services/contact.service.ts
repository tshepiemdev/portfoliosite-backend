import { render } from "@react-email/render";
import * as React from "react";
import Contact from "../models/contact.model";
import EmailEvent from "../models/emailEvent.model";
import { getResend } from "./email.service";
import GetInTouchForm from "../emails/templates/GetInTouchForm";
import GetInTouchConfirmationForm from "../emails/templates/GetInTouchConfirmationForm";

interface ContactData {
  mail_ref: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
  reason?: string;
  teamSize?: string;
  message: string;
  dev_email: string;
}

export const createContact = async (data: ContactData) => {
  const resend = getResend();

  const cleanEmail = data.email.toLowerCase().trim();

  const contact = await Contact.create({
    mail_ref: data.mail_ref,
    firstName: data.firstName,
    lastName: data.lastName,
    email: cleanEmail,
    phone: data.phone,
    country: data.country,
    reason: data.reason,
    teamSize: data.teamSize,
    message: data.message,
  });

  const contactData = {
    ...data,
    email: cleanEmail,
  };

  const adminHtml = await render(
    React.createElement(GetInTouchForm, {
      data: contactData,
    }),
  );

  const adminResponse = await resend.emails.send({
    from: "tshepiem.dev <hello@tshepiem.dev>",
    to: process.env.DEV_CONTACT_EMAIL!,
    subject: "New Message",
    html: adminHtml,
  });

  if (adminResponse.error || !adminResponse.data?.id) {
    throw new Error("We couldn't send your message. Please try again later.");
  }

  await EmailEvent.create({
    resendEmailId: adminResponse.data.id,
    purpose: "contact_notification",
    recipient: process.env.DEV_CONTACT_EMAIL!,
    status: "sent",
  });

  contact.adminEmailId = adminResponse.data.id;
  await contact.save();

  const userHtml = await render(
    React.createElement(GetInTouchConfirmationForm, {
      data: contactData,
    }),
  );

  const userResponse = await resend.emails.send({
    from: "tshepiem.dev <hello@tshepiem.dev>",
    to: cleanEmail,
    subject: "Your Message Was Received",
    html: userHtml,
  });

  if (userResponse.error || !userResponse.data?.id) {
    return {
      contact,
      emailId: adminResponse.data.id,
      confirmationSent: false,
    };
  }

  await EmailEvent.create({
    resendEmailId: userResponse.data.id,
    purpose: "contact_confirmation",
    recipient: cleanEmail,
    status: "sent",
  });

  contact.confirmationEmailId = userResponse.data.id;
  await contact.save();

  return {
    contact,
    emailId: adminResponse.data.id,
    confirmationEmailId: userResponse.data.id,
    confirmationSent: true,
  };
};
