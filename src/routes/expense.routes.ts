import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense
} from "../controllers/expense.controller";

const router = Router();

router.use(authenticate);
router.get("/", getExpenses);
router.get("/:id", getExpenseById);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
