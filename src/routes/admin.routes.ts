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
    const year = Number(req.query.year) || new Date().getFullYear();

    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    const usersCount = await User.countDocuments();
    const categoriesCount = await Category.countDocuments();

    const totalExpenses = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncomes = await Income.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Monthly Expenses (year based)
    const monthlyExpenses = await Expense.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          expense: { $sum: "$amount" },
        },
      },
    ]);

    // Monthly Incomes (year based)
    const monthlyIncomes = await Income.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          income: { $sum: "$amount" },
        },
      },
    ]);

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const monthly = months.map((month, index) => {
      const expense = monthlyExpenses.find(e => e._id === index + 1);
      const income = monthlyIncomes.find(i => i._id === index + 1);

      return {
        month,
        income: income?.income || 0,
        expense: expense?.expense || 0,
      };
    });

    res.json({
      year,
      users: usersCount,
      categories: categoriesCount,
      expenses: totalExpenses[0]?.total || 0,
      incomes: totalIncomes[0]?.total || 0,
      monthly,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
