import express from "express";
import BentoImage from "../models/bentoImage";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const images = await BentoImage.find({
      isActive: true,
    }).sort({
      order: 1,
    });

    res.json(images);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bento images",
    });
  }
});

export default router;