import { Request, Response } from "express";
import Settings from "../models/settings.model";

export const getSettings = async (_req: Request, res: Response) => {
  try {
    let settings = await Settings.findById("main");

    if (!settings) {
      settings = await Settings.create({ _id: "main" });
    }

    return res.status(200).json({
      success: true,
      data: {
        maintenanceMode: settings.maintenanceMode,
        title: settings.title,
        message: settings.message,
        ctaText: settings.ctaText,
        ctaLink: settings.ctaLink,
      },
    });
  } catch (error) {
    console.error("GET /settings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch settings",
    });
  }
};
