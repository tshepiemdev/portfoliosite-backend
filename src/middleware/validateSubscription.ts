import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const subscriptionSchema = z.object({
  email: z.string().email(),
  website: z.string().optional(),
});

export const validateSubscription = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = subscriptionSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid input",
    });
  }

  req.body = result.data;
  next();
};
