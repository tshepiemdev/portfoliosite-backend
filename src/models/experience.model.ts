import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExperience extends Document {
  company: string;
  position?: string;
  from?: string;
  to?: string;
  timelapse?: string;
  location?: string;
  responsibilities?: string[];
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    position: String,
    from: String,
    to: String,
    timelapse: String,
    location: String,
    responsibilities: [String],
    order: { type: Number, default: 0, required: true },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Experience: Model<IExperience> = mongoose.model<IExperience>(
  "Experience",
  experienceSchema,
);

export default Experience;
