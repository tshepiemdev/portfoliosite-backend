import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  mail_ref: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
  reason?: string;
  teamSize?: string;
  message: string;
  adminEmailId?: string;
  confirmationEmailId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    mail_ref: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      trim: true,
    },

    reason: {
      type: String,
      trim: true,
    },

    teamSize: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    adminEmailId: {
      type: String,
      trim: true,
    },

    confirmationEmailId: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Contact: Model<IContact> = mongoose.model<IContact>(
  "Contact",
  contactSchema,
);

export default Contact;
