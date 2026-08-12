import { Request, Response, NextFunction } from "express";

export const honeypotCheck = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.body.website) {
    return res.status(400).json({
      success: false,
      message: "Spam detected",
    });
  }

  next();
};
