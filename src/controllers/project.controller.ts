import { Request, Response } from "express";
import Project from "../models/project.model";

export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find({ isActive: true }).sort({
      order: 1,
    });

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error fetching projects",
    });
  }
};

export const getProjectBySlug = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error fetching project",
    });
  }
};

export const incrementProjectViews = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOneAndUpdate(
      {
        slug: req.params.slug,
        isActive: true,
      },
      {
        $inc: {
          views: 1,
        },
      },
      {
        new: true,
      },
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      views: project.views,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error updating views",
    });
  }
};
