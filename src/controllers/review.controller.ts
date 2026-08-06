import { Request, Response } from "express";
import Review from "../models/review.model";

export const getReviews = async (_req: Request, res: Response) => {
  try {
    const reviews = await Review.find({
      isActive: true,
    }).sort({
      order: 1,
    });

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error("GET /reviews error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error:
        process.env.NODE_ENV === "development" && error instanceof Error
          ? error.message
          : undefined,
    });
  }
};
