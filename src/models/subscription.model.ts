import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubscription extends Document {
  email: string;
  verified: boolean;
  verificationToken?: string;
  verificationExpires?: Date;
  unsubscribeToken: string;
  isActive: boolean;
  subscribedAt?: Date;
  verificationTokenUsed: boolean;
}

const subscriptionSchema = new Schema<ISubscription>({
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
    required: false,
  },

  verificationExpires: {
    type: Date,
    required: false,
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
});

const Subscription: Model<ISubscription> = mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema,
);

export default Subscription;
