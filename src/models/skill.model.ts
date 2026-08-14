import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISkill extends Document {
  category?: string;
  img?: string;
  items?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    category: String,
    img: String,
    items: [String],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Skill: Model<ISkill> = mongoose.model<ISkill>("Skill", SkillSchema);

export default Skill;
