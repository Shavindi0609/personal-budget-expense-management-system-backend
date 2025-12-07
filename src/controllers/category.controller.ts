import { Request, Response } from "express";
import Category from "../models/Category";

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Name is required" });

  const exists = await Category.findOne({ name });
  if (exists)
    return res.status(400).json({ message: "Category already exists" });

  const category = await Category.create({ name });

  res.status(201).json({ category });
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json({ categories });
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Name is required" });

  const category = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );

  res.json({ category });
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Category.findByIdAndDelete(id);

  res.json({ message: "Category deleted" });
};
