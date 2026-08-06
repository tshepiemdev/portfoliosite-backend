import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  incrementBlogViews,
} from "../controllers/blog.controller";

const router = express.Router();

router.get("/", getBlogs);
router.post("/:slug/view", incrementBlogViews);
router.get("/:slug", getBlogBySlug);

export default router;
