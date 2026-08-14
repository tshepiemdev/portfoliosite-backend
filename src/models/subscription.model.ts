import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubscription extends Document {
  email: string;
  verified: boolean;
  verificationToken?: string;
  verificationExpires?: Date;
  verificationTokenUsed: boolean;
  unsubscribeToken: string;
  isActive: boolean;
  subscribedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
    },

    verificationExpires: {
      type: Date,
    },

    verificationTokenUsed: {
      type: Boolean,
      default: false,
    },

    unsubscribeToken: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    subscribedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Subscription: Model<ISubscription> = mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema,
);

export default Subscription;
