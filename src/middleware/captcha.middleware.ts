import { Request, Response, NextFunction } from "express";
import axios from "axios";

export const verifyCaptcha = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.body.recaptcha_token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Captcha token missing",
      });
    }

    const result = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET,
          response: token,
        },
      },
    );

    if (!result.data.success) {
      return res.status(400).json({
        success: false,
        message: "Captcha failed",
        errors: result.data["error-codes"],
      });
    }

    next();
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Captcha verification error",
    });
  }
};
