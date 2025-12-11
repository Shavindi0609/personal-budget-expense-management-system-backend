import { Request, Response } from "express";
import Income from "../models/Income";

export const createIncome = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const { source, amount, date } = req.body;
  if (!source || !amount) return res.status(400).json({ message: "Missing fields" });

  const income = await Income.create({ source, amount, date: date || Date.now(), user: userId });
  res.status(201).json({ income });
};

export const getIncomes = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const incomes = await Income.find({ user: userId }).sort({ date: -1 });
  res.json({ incomes });
};

export const updateIncome = async (req: Request, res: Response) => {
  const { id } = req.params;
  const income = await Income.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ income });
};

export const deleteIncome = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Income.findByIdAndDelete(id);
  res.json({ message: "Deleted" });
};
