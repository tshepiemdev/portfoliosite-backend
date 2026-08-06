import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISettings extends Omit<Document, "_id"> {
  _id: string;
  maintenanceMode: boolean;
  title: string;
  message: string;
  ctaText: string;
  ctaLink: string;
}

const SettingsSchema = new Schema<ISettings>(
  {
    _id: {
      type: String,
      default: "main",
    },

    maintenanceMode: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: "title",
    },

    message: {
      type: String,
      default: "message",
    },

    ctaText: {
      type: String,
      default: "",
    },

    ctaLink: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Settings: Model<ISettings> = mongoose.model<ISettings>(
  "Settings",
  SettingsSchema,
);

export default Settings;
