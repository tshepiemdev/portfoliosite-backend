import mongoose, { Schema, Document, Model } from "mongoose";
import slugify from "slugify";

export interface ILegal extends Document {
  name: string;
  slug: string;
  text: string;
  for: string;
  company: string;
  company_address: string;
  copyright_start: string;
  last_update_date: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const LegalSchema = new Schema<ILegal>(
  {
    name: { type: String, required: true },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    text: { type: String, required: true },
    for: { type: String, required: true },
    company: { type: String, required: true },
    company_address: { type: String, required: true },
    copyright_start: { type: String, required: true },
    last_update_date: { type: String, required: true },

    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

LegalSchema.pre("save", function () {
  if (!this.slug || this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
});

const Legal: Model<ILegal> = mongoose.model<ILegal>("Legal", LegalSchema);

export default Legal;