import express from "express";
import {
  getMonthlySavings,
  createGoal,
  getGoals,
} from "../controllers/savings.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

// 📊 Monthly savings (Income - Expenses)
router.get("/monthly", authenticate, getMonthlySavings);

// 🎯 Create savings goal
router.post("/goals", authenticate, createGoal);

// 📋 Get all goals
router.get("/goals", authenticate, getGoals);

export default router;
