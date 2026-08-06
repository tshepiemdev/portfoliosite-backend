import { Request, Response } from "express";
import HelpCenter from "../models/helpcenter.model";

export const getHelpCenters = async (_req: Request, res: Response) => {
  try {
    const helpcenters = await HelpCenter.find({
      isActive: true,
    }).sort({ order: 1 });

    return res.status(200).json({
      success: true,
      data: helpcenters,
    });
  } catch (error) {
    console.error("GET /helpcenters error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch help center items",
      error:
        process.env.NODE_ENV === "development" && error instanceof Error
          ? error.message
          : undefined,
    });
  }
};
