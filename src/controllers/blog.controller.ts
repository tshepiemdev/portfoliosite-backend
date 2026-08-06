import { Request, Response } from "express";
import Blog from "../models/blog.model";

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({ isActive: true }).sort({
      publishedDate: -1,
    });

    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!blog) {
      res.status(404).json({
        success: false,
        message: "Blog not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
    });
  }
};

export const incrementBlogViews = async (req: Request, res: Response) => {
  try {
    console.log("VIEW REQUEST SLUG:", req.params.slug);

    const blog = await Blog.findOneAndUpdate(
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

    console.log("UPDATED BLOG:", blog);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      views: blog.views,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Failed to update views",
    });
  }
};
