import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICv extends Document {
  fullName: string;
  position: string;
  status: "Open to Work" | "Hired" | "Unavailable";
  professionalSummary: {
    text: string[];
    image: string;
  }[];
  cvLink: string;
  profileImage?: string;
  isActive: boolean;

  education: {
    type: string;
    name: string;
    institute: string;
    year: string;
    isActive: boolean;
  }[];

  experience: {
    company: string;
    position: string;
    from: string;
    to: string;
    location: string;
    isActive: boolean;
  }[];

  projects: {
    name: string;
    type: string;
  }[];

  references: string;

  technicalSkills: {
    category: string;
    skills: string[];
  }[];

  softSkills: string[];

  email: string;
  phone: string;
  location: string;

  links: {
    github: string;
    linkedin: string;
  }[];
}

const CVSchema = new Schema<ICv>({
  fullName: {
    type: String,
    required: true,
  },

  position: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["Open to Work", "Hired", "Unavailable"],
    default: "Open to Work",
  },

  professionalSummary: [
    {
      text: [
        {
          type: String,
          required: true,
        },
      ],
      image: {
        type: String,
      },
    },
  ],

  cvLink: {
    type: String,
    required: true,
  },

  profileImage: {
    type: String,
    default: "",
  },

  education: [
    {
      type: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      institute: {
        type: String,
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
  ],

  experience: [
    {
      company: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
  ],

  projects: [
    {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
  ],

  references: {
    type: String,
    default: "Available upon request",
  },

  technicalSkills: [
    {
      category: {
        type: String,
        required: true,
      },
      skills: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],

  softSkills: [
    {
      type: String,
    },
  ],

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  links: [
    {
      github: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
    },
  ],

  isActive: {
    type: Boolean,
    default: true,
  },
});

const Cv: Model<ICv> =
  mongoose.models.Cv || mongoose.model<ICv>("Cv", CVSchema);

export default Cv;
