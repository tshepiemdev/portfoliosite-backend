import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEmailEvent extends Document {
  resendEmailId: string;
  purpose:
    | "subscription_verification"
    | "subscription_confirmation"
    | "contact_notification"
    | "contact_confirmation"
    | "service_notification"
    | "service_confirmation";
  recipient: string;
  status:
    | "sent"
    | "delivered"
    | "delivery_delayed"
    | "bounced"
    | "failed"
    | "complained";
}

const emailEventSchema = new Schema<IEmailEvent>(
  {
    resendEmailId: {
      type: String,
      required: true,
      unique: true,
    },

    purpose: {
      type: String,
      required: true,
      enum: [
        "subscription_verification",
        "subscription_confirmation",
        "contact_notification",
        "contact_confirmation",
        "service_notification",
        "service_confirmation",
      ],
    },

    recipient: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    status: {
      type: String,
      required: true,
      enum: [
        "sent",
        "delivered",
        "delivery_delayed",
        "bounced",
        "failed",
        "complained",
      ],
      default: "sent",
    },
  },
  {
    timestamps: true,
  },
);

const EmailEvent: Model<IEmailEvent> = mongoose.model<IEmailEvent>(
  "EmailEvent",
  emailEventSchema,
);

export default EmailEvent;
