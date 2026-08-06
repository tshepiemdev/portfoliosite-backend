import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQualification extends Document {
  type: string;
  name: string;
  institute: string;
  year: string;
  isActive: boolean;
}

const qualificationSchema = new Schema<IQualification>({
  type: { type: String, required: true },
  name: { type: String, required: true },
  institute: { type: String, required: true },
  year: { type: String, required: true },

  isActive: {
    type: Boolean,
    default: true,
  },
});

const Qualification: Model<IQualification> = mongoose.model<IQualification>(
  "Qualification",
  qualificationSchema,
);

export default Qualification;
