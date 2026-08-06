import mongoose from "mongoose";
import Project from "../models/project.model";
import slugify from "slugify";

const addProjectSlugs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    const projects = await Project.find({
      $or: [{ slug: { $exists: false } }, { slug: "" }, { slug: null }],
    });

    for (const project of projects) {
      project.slug = slugify(project.projectName, {
        lower: true,
        strict: true,
      });

      await project.save();

      console.log(`Added slug: ${project.projectName} -> ${project.slug}`);
    }

    console.log("Finished adding project slugs");

    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

addProjectSlugs();
