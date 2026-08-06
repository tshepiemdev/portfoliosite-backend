import { Request, Response } from "express";
import Skill from "../models/skill.model";

export const getSkills = async (_req: Request, res: Response) => {
  try {
    const skills = await Skill.find({ isActive: true });

    return res.status(200).json({
      success: true,
      data: skills,
    });
  } catch (error) {
    console.error("GET /skills error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
      error:
        process.env.NODE_ENV === "development" && error instanceof Error
          ? error.message
          : undefined,
    });
  }
};
