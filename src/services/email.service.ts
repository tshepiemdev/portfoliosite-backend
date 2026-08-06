import { Resend } from "resend";

let resend: Resend;

export const getResend = () => {
  if (!resend) {
    const key = process.env.RESEND_API_KEY;

    if (!key) {
      throw new Error("RESEND_API_KEY is missing");
    }

    resend = new Resend(key);
  }

  return resend;
};
