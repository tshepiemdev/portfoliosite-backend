import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const contactSchema = z.object({
  mail_ref: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  reason: z.string().optional(),
  teamSize: z.string().optional(),
  message: z.string().min(1).max(1000),
  turnstile_token: z.string().min(1),
});

export const validateContact = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = contactSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid input",
    });
  }

  req.body = result.data;
  next();
};
