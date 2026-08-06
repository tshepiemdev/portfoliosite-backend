import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const contactSchema = z.object({
  email: z.string().email(),
  mail_ref: z.string().min(1),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  message: z.string().optional(),
});

export const validateContact = (
  req: Request,
  res: Response,
  next: NextFunction
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