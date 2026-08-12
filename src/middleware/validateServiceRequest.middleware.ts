import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const serviceRequestSchema = z.object({
  mail_ref: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().min(1),
  company: z.string().optional(),
  service: z.string().min(1),
  package: z.string().optional(),
  price: z.union([z.number(), z.string()]).nullable().optional(),
  pricingType: z.string().optional(),
  budget: z.string().min(1),
  startTime: z.string().min(1),
  message: z.string().max(1000).optional(),
  turnstile_token: z.string().min(1),
});

export const validateServiceRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = serviceRequestSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid service request data",
    });
  }

  req.body = result.data;

  next();
};
