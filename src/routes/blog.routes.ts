import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  incrementBlogViews,
  incrementBlogLikes,
  decrementBlogLikes,
} from "../controllers/blog.controller";

const router = express.Router();

router.get("/", getBlogs);
router.post("/:slug/view", incrementBlogViews);
router.post("/:slug/like", incrementBlogLikes);
router.delete("/:slug/like", decrementBlogLikes);
router.get("/:slug", getBlogBySlug);

export default router;
