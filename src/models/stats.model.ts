import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStat extends Document {
  clients: number;
  awards: number;
  yearsActive: number;
  isActive: boolean;
}

const StatSchema = new Schema<IStat>({
  clients: {
    type: Number,
    default: 0,
  },

  awards: {
    type: Number,
    default: 0,
  },

  yearsActive: {
    type: Number,
    default: 0,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
});


const Stat: Model<IStat> = mongoose.model<IStat>(
  "Stat",
  StatSchema
);

export default Stat;