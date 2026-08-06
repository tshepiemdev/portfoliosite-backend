import { Request, Response } from "express";
import Cv from "../models/cv.model";

export const getCV = async (_req: Request, res: Response) => {
  try {
    const cv = await Cv.findOne({ isActive: true });

    if (!cv) {
      return res.status(404).json({
        success: false,
        message: "CV not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: cv,
    });
  } catch (error) {
    console.error("CV fetch error:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching CV",
    });
  }
};
