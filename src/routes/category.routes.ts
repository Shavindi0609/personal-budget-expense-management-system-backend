import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/admin.middleware";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";

const router = Router();

// Admin can add
router.post("/", authenticate, adminOnly, createCategory);

// Any logged in user can view
router.get("/", authenticate, getCategories);

// Admin can update
router.put("/:id", authenticate, adminOnly, updateCategory);

// Admin can delete
router.delete("/:id", authenticate, adminOnly, deleteCategory);

export default router;
