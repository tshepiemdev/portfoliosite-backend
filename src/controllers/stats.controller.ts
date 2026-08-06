import { Request, Response } from "express";
import Skill from "../models/skill.model";
import Project from "../models/project.model";
import Qualification from "../models/qualification.model";
import Experience from "../models/experience.model";

const calculateExperienceYears = (experiences: any[]) => {
  let totalMonths = 0;

  experiences.forEach((exp) => {
    const from = new Date(exp.from);

    const to =
      exp.to?.toLowerCase() === "present" ? new Date() : new Date(exp.to);

    const months =
      (to.getFullYear() - from.getFullYear()) * 12 +
      (to.getMonth() - from.getMonth());

    totalMonths += Math.max(months, 0);
  });

  return Math.floor(totalMonths / 12);
};

export const getStats = async (_req: Request, res: Response) => {
  try {
    const [skills, projects, qualifications, experiences] = await Promise.all([
      Skill.find({ isActive: true }),
      Project.find({ isActive: true }),
      Qualification.find({ isActive: true }),
      Experience.find({ isActive: true }),
    ]);

    const techStack = skills.reduce(
      (total, category) => total + (category.items?.length || 0),
      0,
    );

    const totalProjects = projects.length;

    const shippedProducts = projects.filter(
      (project) => project.projectStatus?.toLowerCase() === "shipped",
    ).length;

    const totalQualifications = qualifications.length;

    const experienceYears = calculateExperienceYears(experiences);

    return res.status(200).json({
      success: true,
      data: {
        techStack,
        projects: totalProjects,
        shippedProducts,
        qualifications: totalQualifications,
        experienceYears,
      },
    });
  } catch (error) {
    console.error("GET /stats error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
    });
  }
};
