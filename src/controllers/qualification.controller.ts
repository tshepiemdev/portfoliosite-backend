import { Request, Response } from "express";
import Qualification from "../models/qualification.model";

export const getQualifications = async (_req: Request, res: Response) => {
  try {
    const qualifications = await Qualification.find({
      isActive: true,
    });

    return res.status(200).json({
      success: true,
      data: qualifications,
    });
  } catch (error) {
    console.error("GET /qualifications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch qualifications",
      error:
        process.env.NODE_ENV === "development" && error instanceof Error
          ? error.message
          : undefined,
    });
  }
};
