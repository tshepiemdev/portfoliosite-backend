import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISettings extends Omit<Document, "_id"> {
  _id: string;
  maintenanceMode: boolean;
  maintenancePages: {
    home: boolean;
    contact: boolean;
    serviceRequest: boolean;
    hireMe: boolean;
    services: boolean;
    projects: boolean;
    legal: boolean;
    blogs: boolean;
    helpCenter: boolean;
    cv: boolean;
    pricing: boolean;
    subscribeVerify: boolean;
  };
  title: string;
  message: string;
  ctaText: string;
  ctaLink: string;
  createdAt: Date;
  updatedAt: Date;
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

    maintenancePages: {
      home: {
        type: Boolean,
        default: false,
      },

      contact: {
        type: Boolean,
        default: false,
      },

      serviceRequest: {
        type: Boolean,
        default: false,
      },

      hireMe: {
        type: Boolean,
        default: false,
      },

      services: {
        type: Boolean,
        default: false,
      },

      projects: {
        type: Boolean,
        default: false,
      },

      legal: {
        type: Boolean,
        default: false,
      },

      blogs: {
        type: Boolean,
        default: false,
      },

      helpCenter: {
        type: Boolean,
        default: false,
      },

      cv: {
        type: Boolean,
        default: false,
      },

      pricing: {
        type: Boolean,
        default: false,
      },

      subscribeVerify: {
        type: Boolean,
        default: false,
      },
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
