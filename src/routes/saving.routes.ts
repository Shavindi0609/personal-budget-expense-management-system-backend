import express from "express";
import {
  getMonthlySavings,
  createGoal,
  getGoals,
  addSavingsToGoal,
} from "../controllers/savings.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

// 📊 Monthly savings
router.get("/monthly", authenticate, getMonthlySavings);

// 🎯 Goals
router.post("/goals", authenticate, createGoal);
router.get("/goals", authenticate, getGoals);

// ➕ ADD SAVINGS TO GOAL
router.patch("/goals/:goalId/add", authenticate, addSavingsToGoal);

export default router;
