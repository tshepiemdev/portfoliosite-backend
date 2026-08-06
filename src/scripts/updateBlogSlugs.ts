import mongoose from "mongoose";
import Blog from "../models/blog.model";
import slugify from "slugify";
import dotenv from "dotenv";

dotenv.config();

const updateSlugs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const blogs = await Blog.find().lean();

    console.log(`Found ${blogs.length} blogs`);

    for (const blog of blogs) {
      const slug = slugify(blog.title, {
        lower: true,
        strict: true,
      });

      await Blog.updateOne(
        { _id: blog._id },
        {
          $set: {
            slug,
          },
        },
      );

      console.log(`Updated: ${blog.title}`);
    }

    console.log("Slugs updated successfully");

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Error updating slugs:", err);
    process.exit(1);
  }
};

updateSlugs();
