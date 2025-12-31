import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/admin.middleware";
import User from "../models/User";
import Category from "../models/Category";
import Expense from "../models/Expense";
import Income from "../models/Income";

const router = Router();

router.get("/stats", authenticate, adminOnly, async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const categoriesCount = await Category.countDocuments();

    const totalExpenses = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncomes = await Income.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      users: usersCount,
      categories: categoriesCount,
      expenses: totalExpenses[0]?.total || 0,
      incomes: totalIncomes[0]?.total || 0,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
