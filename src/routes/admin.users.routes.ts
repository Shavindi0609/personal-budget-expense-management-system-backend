import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/admin.middleware";
import {
  getUsers,
  updateUserRole,
  toggleBlockUser,
  deleteUser,
} from "../controllers/adminUser.controller";

const router = Router();

// Admin only
router.get("/", authenticate, adminOnly, getUsers);

// Change role
router.put("/:id/role", authenticate, adminOnly, updateUserRole);

// Block / Unblock
router.put("/:id/block", authenticate, adminOnly, toggleBlockUser);

// Delete
router.delete("/:id", authenticate, adminOnly, deleteUser);

export default router;
