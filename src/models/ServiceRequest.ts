import mongoose, { Document, Schema } from "mongoose";

export interface IServiceRequest extends Document {
  mail_ref: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
  company?: string;
  service: string;
  package?: string;
  price?: number | string | null;
  pricingType?: string;
  budget: string;
  startTime: string;
  message?: string;

  adminEmailId?: string;
  confirmationEmailId?: string;

  adminEmailStatus?: string;
  confirmationEmailStatus?: string;

  createdAt: Date;
  updatedAt: Date;
}

const serviceRequestSchema = new Schema<IServiceRequest>(
  {
    mail_ref: {
      type: String,
      required: true,
      unique: true,
      index: true,
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
      default: "",
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      default: "",
      trim: true,
    },

    service: {
      type: String,
      required: true,
      trim: true,
    },

    package: {
      type: String,
      default: "",
      trim: true,
    },

    price: {
      type: Schema.Types.Mixed,
      default: null,
    },

    pricingType: {
      type: String,
      default: "custom",
      trim: true,
    },

    budget: {
      type: String,
      required: true,
      trim: true,
    },

    startTime: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    adminEmailId: {
      type: String,
      default: "",
    },

    confirmationEmailId: {
      type: String,
      default: "",
    },

    adminEmailStatus: {
      type: String,
      default: "pending",
    },

    confirmationEmailStatus: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IServiceRequest>(
  "ServiceRequest",
  serviceRequestSchema,
);
