import mongoose, { Schema, Document, Model } from "mongoose";

export type PackageType = "Starter" | "Business" | "Enterprise";
export type ServiceType = "web" | "webapp" | "mobile" | "hosting";

export interface IPackage {
  package: PackageType;
  title: string;
  nowPrice: number | null;
  oldPrice: number | null;
  per: string;
  isFeatured: boolean;
  isActive: boolean;
  description: string;
  features: string[];
  ctaLink: string;
}

export interface IPricing extends Document {
  type: ServiceType;
  packages: IPackage[];
  isActive: boolean;
}

const PackageSchema = new Schema<IPackage>({
  package: {
    type: String,
    enum: ["Starter", "Business", "Enterprise"],
    required: true,
  },
  title: { type: String, required: true },
  nowPrice: { type: Number, default: null },
  oldPrice: { type: Number, default: null },
  per: { type: String, default: null },
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  description: { type: String, required: true },
  features: [{ type: String }],
  ctaLink: { type: String, required: true },
});

const PricingSchema = new Schema<IPricing>({
  type: {
    type: String,
    enum: ["web", "webapp", "mobile", "hosting"],
    required: true,
    unique: true,
  },
  packages: [PackageSchema],
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Pricing: Model<IPricing> = mongoose.model<IPricing>(
  "Pricing",
  PricingSchema,
);

export default Pricing;
