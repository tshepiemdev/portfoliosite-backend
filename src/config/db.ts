import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error);
    console.log("Starting server without database...");

    // stop backend
    // process.exit(1);
  }
};
