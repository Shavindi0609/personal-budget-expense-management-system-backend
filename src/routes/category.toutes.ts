import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/admin.middleware";
import Category from "../models/Category";

const router = Router();

// Admin adds category
router.post("/", authenticate, adminOnly, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  const existing = await Category.findOne({ name });
  if (existing) return res.status(400).json({ message: "Category already exists" });

  const category = await Category.create({ name });
  res.json(category);
});

// Get all categories (any logged-in user)
router.get("/", authenticate, async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

export default router;
