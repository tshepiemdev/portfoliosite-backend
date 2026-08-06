import { Request, Response } from "express";
import BentoImage from "../models/bentoImage";

export const getBentoImages = async (req: Request, res: Response) => {
  try {
    const images = await BentoImage.find({
      isActive: true,
    }).sort({
      order: 1,
    });

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bento images",
    });
  }
};
