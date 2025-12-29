import SavingsGoal from "../models/SavingGoal";
import { Request, Response } from "express";
import mongoose from "mongoose";
import Expense from "../models/Expense";
import Income from "../models/Income";

export const getMonthlySavings = async (req: Request, res: Response) => {
  const userId = new mongoose.Types.ObjectId((req as any).user.id);
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month is required" });
  }

  const start = new Date(`${month}-01`);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);

  const incomeAgg = await Income.aggregate([
    { $match: { user: userId, date: { $gte: start, $lt: end } } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const expenseAgg = await Expense.aggregate([
    { $match: { user: userId, date: { $gte: start, $lt: end } } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const income = incomeAgg[0]?.total || 0;
  const expense = expenseAgg[0]?.total || 0;

  res.json({
    income,
    expense,
    savings: income - expense,
  });
};

export const createGoal = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { title, targetAmount } = req.body;

  if (!title || !targetAmount) {
    return res.status(400).json({ message: "Title & targetAmount required" });
  }

  const goal = await SavingsGoal.create({
    user: userId,
    title,
    targetAmount,
    currentAmount: 0,
  });

  res.status(201).json(goal);
};

export const getGoals = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const goals = await SavingsGoal.find({ user: userId });
  res.json(goals);
};
