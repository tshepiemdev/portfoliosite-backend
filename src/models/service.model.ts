import mongoose, { Schema, Document, Model } from "mongoose";
import slugify from "slugify";

interface ICta {
  text: string;
  link: string;
}

interface IPricing {
  pricingType?: "hourly" | "project-based";
  rate?: number;
  currency: string;
  unit?: string;
}

interface IAvailability {
  operatingDays?: string[];
  hours?: string;
  timezone?: string;
}

interface ILegalRef {
  name?: string;
  link?: string;
}

interface ISeo {
  name?: string;
  description?: string;
}

export interface IService extends Document {
  name: string;
  slug: string;
  icon?: string;
  shortDescription: string;
  longDescription?: string;
  category: string;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
  cta: ICta;
  technologies: string[];
  features: string[];
  deliverables: string[];
  timeline?: string;
  location?: string;
  session?: string;
  pricing: IPricing;
  availability: IAvailability;
  legal: ILegalRef[];
  seo: ISeo;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    icon: {
      type: String,
      default: "",
    },

    shortDescription: {
      type: String,
      required: true,
    },

    longDescription: String,

    category: {
      type: String,
      default: "other",
    },

    order: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    cta: {
      text: { type: String, default: "Request Service" },
      link: { type: String, default: "/contact" },
    },

    technologies: {
      type: [String],
      default: [],
    },

    features: {
      type: [String],
      default: [],
    },

    deliverables: {
      type: [String],
      default: [],
    },

    timeline: String,

    location: String,

    session: String,

    pricing: {
      pricingType: {
        type: String,
        enum: ["hourly", "project-based"],
      },
      rate: Number,
      currency: {
        type: String,
        default: "ZAR",
      },
      unit: String,
    },

    availability: {
      operatingDays: [String],
      hours: String,
      timezone: String,
    },

    legal: [
      {
        name: String,
        link: String,
      },
    ],

    seo: {
      name: String,
      description: String,
    },
  },
  {
    timestamps: true,
  },
);

ServiceSchema.pre("save", function () {
  if (!this.slug || this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
});

const Service: Model<IService> = mongoose.model<IService>(
  "Service",
  ServiceSchema,
);

export default Service;
