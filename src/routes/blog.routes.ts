import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  incrementBlogViews,
  incrementBlogLikes,
} from "../controllers/blog.controller";

const router = express.Router();

router.get("/", getBlogs);
router.post("/:slug/view", incrementBlogViews);
router.post("/:slug/like", incrementBlogLikes);
router.get("/:slug", getBlogBySlug);

export default router;
