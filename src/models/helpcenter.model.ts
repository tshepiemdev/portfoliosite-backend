import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHelpArticle {
  title: string;
  description: string;
  order: number;
  isActive: boolean;
}

export interface IHelpCenter extends Document {
  title: string;
  description: string;
  articles: IHelpArticle[];
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const helpArticleSchema = new Schema<IHelpArticle>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  },
);

const helpCenterSchema = new Schema<IHelpCenter>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    articles: {
      type: [helpArticleSchema],
      required: true,
      default: [],
    },

    order: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const HelpCenter: Model<IHelpCenter> = mongoose.model<IHelpCenter>(
  "HelpCenter",
  helpCenterSchema,
  "helpcenters",
);

export default HelpCenter;
