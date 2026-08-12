import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const subscriptionSchema = z.object({
  email: z.string().email(),
  website: z.string().optional(),
  turnstile_token: z.string().min(1),
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
