import mongoose, { Schema, Document, Model } from "mongoose";
import slugify from "slugify";

interface ISection {
  media?: {
    type: "image" | "video";
    url: string;
    provider?: "youtube" | "vimeo" | "loom" | "direct" | "other";
  };
  heading: string;
  body: string;
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  category: string;
  author: string;
  authorProfileImg: string;
  publishedDate: Date;
  isFeatured: boolean;
  isActive: boolean;
  imageUrl: string;
  imageSource: string;
  excerpt: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  content: {
    intro?: string;
    sections: ISection[];
  };
}

const SectionSchema = new Schema<ISection>(
  {
    media: {
      type: {
        type: String,
        enum: ["image", "video"],
      },
      url: {
        type: String,
        trim: true,
      },
      provider: {
        type: String,
        enum: ["youtube", "vimeo", "loom", "direct", "other"],
      },
    },
    heading: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    category: { type: String, default: "general" },
    author: { type: String, default: "Developer" },
    authorProfileImg: { type: String, default: "" },

    publishedDate: { type: Date, default: Date.now },

    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    views: {
      type: Number,
      default: 0,
    },

    imageUrl: { type: String, default: "" },

    imageSource: { type: String, default: "Unspecified source" },

    excerpt: { type: String, required: true },

    content: {
      intro: String,
      sections: [SectionSchema],
    },
  },
  {
    timestamps: true,
  },
);

BlogSchema.pre("save", function () {
  if (!this.slug || this.isModified("title")) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  }
});

const Blog: Model<IBlog> = mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
