import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  name?: string;
  position?: string;
  company?: string;
  profileImg?: string;
  testimony?: string;
  isActive: boolean;
  order: number;
}

const ReviewSchema = new Schema<IReview>({
  name: String,
  position: String,
  company: String,
  profileImg: String,
  testimony: String,
  isActive: { type: Boolean, default: true, required: true },
  order: { type: Number, default: 0, required: true },
});

const Review: Model<IReview> = mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
