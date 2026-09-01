import mongoose, { Schema, Document, Model } from "mongoose";
import slugify from "slugify";

export interface IProject extends Document {
  projectIcon?: string;
  projectImages?: string[];
  projectName: string;
  slug: string;
  projectType?: string;
  projectYear?: number;
  projectOwnership?: string;
  projectStatus?: string;
  views: number;
  isActive: boolean;
  isProjNew: boolean;
  order: number;
  projectShortDescription?: string;
  projectStack?: string[];
  keyFeatures?: string[];
  teamSize?: number;
  projectLiveLink?: string;
  projectRepoLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    projectIcon: String,

    projectImages: [String],

    projectName: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    projectType: String,

    projectYear: Number,

    projectOwnership: String,

    projectStatus: String,

    views: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    isProjNew: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
    },

    projectShortDescription: String,

    projectStack: [String],

    keyFeatures: [String],

    teamSize: Number,

    projectLiveLink: String,

    projectRepoLink: String,
  },
  {
    timestamps: true,
  },
);

ProjectSchema.pre("save", function () {
  if (!this.slug || this.isModified("projectName")) {
    this.slug = slugify(this.projectName, {
      lower: true,
      strict: true,
    });
  }
});

const Project: Model<IProject> = mongoose.model<IProject>(
  "Project",
  ProjectSchema,
);

export default Project;
