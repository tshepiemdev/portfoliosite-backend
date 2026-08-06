import { Request, Response } from "express";
import Pricing from "../models/pricing.model";

export const getPricings = async (_req: Request, res: Response) => {
  try {
    const pricings = await Pricing.find({ isActive: true });

    return res.status(200).json({
      success: true,
      data: pricings,
    });
  } catch (error) {
    console.error("GET /pricings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch pricing",
      error:
        process.env.NODE_ENV === "development" && error instanceof Error
          ? error.message
          : undefined,
    });
  }
};
