import { Request, Response } from "express";
import Legal from "../models/legal.model";

export const getLegals = async (_req: Request, res: Response) => {
  try {
    const legals = await Legal.find({
      isActive: true,
    }).sort({ order: 1 });

    return res.status(200).json({
      success: true,
      data: legals,
    });
  } catch (error) {
    console.error("GET /legals error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch legals",
    });
  }
};

export const getLegalBySlug = async (req: Request, res: Response) => {
  try {
    const legal = await Legal.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!legal) {
      return res.status(404).json({
        success: false,
        message: "Legal document not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: legal,
    });
  } catch (error) {
    console.error("GET /legals/:slug error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch legal document",
    });
  }
};
