import { Request, Response, NextFunction } from "express";
import axios from "axios";

export const verifyTurnstile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.body.turnstile_token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Turnstile token missing",
      });
    }

    const result = await axios.post(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        secret: process.env.TURNSTILE_SECRET,
        response: token,
      },
    );

    if (!result.data.success) {
      return res.status(400).json({
        success: false,
        message: "Turnstile verification failed",
        errors: result.data["error-codes"],
      });
    }

    next();
  } catch (err) {
    console.error("Turnstile verification error:", err);

    return res.status(500).json({
      success: false,
      message: "Turnstile verification error",
    });
  }
};
