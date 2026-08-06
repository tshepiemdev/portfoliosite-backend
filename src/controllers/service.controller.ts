import { Request, Response } from "express";
import Service from "../models/service.model";

export const getServices = async (_req: Request, res: Response) => {
  try {
    const services = await Service.find({
      isActive: true,
    }).sort({
      order: 1,
    });

    return res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("GET /services error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch services",
      error:
        process.env.NODE_ENV === "development" && error instanceof Error
          ? error.message
          : undefined,
    });
  }
};

export const getServiceBySlug = async (req: Request, res: Response) => {
  try {
    const service = await Service.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("GET /services/:slug error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch service",
      error:
        process.env.NODE_ENV === "development" && error instanceof Error
          ? error.message
          : undefined,
    });
  }
};
