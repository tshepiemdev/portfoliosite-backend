import { Request, Response } from "express";
import Experience from "../models/experience.model";

export const getExperiences = async (_req: Request, res: Response) => {
  try {
    const experiences = await Experience.find({
      isActive: true,
    }).sort({ order: 1 });

    return res.status(200).json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    console.error("GET /experiences error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch experiences",
      error:
        process.env.NODE_ENV === "development" && error instanceof Error
          ? error.message
          : undefined,
    });
  }
};
