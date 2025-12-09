import { Request, Response } from "express";
import Expense from "../models/Expense";

export const createExpense = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const { title, amount, date, notes, category } = req.body;
  if (!title || !amount) return res.status(400).json({ message: "Missing fields" });

  const expense = await Expense.create({
    title,
    amount,
    date: date || Date.now(),
    notes,
    category,
    user: userId
  });

  res.status(201).json({ expense });
};


export const getExpenses = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const { category, from, to } = req.query as any;
  const filter: any = { user: userId };

  if (category) filter.category = category;
  if (from || to) filter.date = {};
  if (from) filter.date.$gte = new Date(from);
  if (to) filter.date.$lte = new Date(to);

  // Remove populate
  const expenses = await Expense.find(filter)
    .sort({ date: -1 })
    .lean(); // optional, for better performance

  res.json({ expenses });
};

export const getExpenseById = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Remove populate
  const expense = await Expense.findById(id).lean();
  if (!expense) return res.status(404).json({ message: "Not found" });

  res.json({ expense });
};

// export const getExpenses = async (req: Request, res: Response) => {
//   const userId = (req as any).user?.id;
//   // Accept query params for filtering (month, category)
//   const { category, from, to } = req.query as any;
//   const filter: any = { user: userId };
//   if (category) filter.category = category;
//   if (from || to) filter.date = {};
//   if (from) filter.date.$gte = new Date(from);
//   if (to) filter.date.$lte = new Date(to);

//   const expenses = await Expense.find(filter).populate("category").sort({ date: -1 });
//   res.json({ expenses });
// };

// export const getExpenseById = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const expense = await Expense.findById(id).populate("category");
//   if (!expense) return res.status(404).json({ message: "Not found" });
//   res.json({ expense });
// };

export const updateExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const expense = await Expense.findByIdAndUpdate(id, data, { new: true });
  res.json({ expense });
};

export const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Expense.findByIdAndDelete(id);
  res.json({ message: "Deleted" });
};
