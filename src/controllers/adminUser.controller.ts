import { Request, Response } from "express";
import User from "../models/User";

/**
 * GET all users
 */
export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json({ users });
};

/**
 * CHANGE ROLE (user ↔ admin)
 */
export const updateUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }

  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  ).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ user });
};

/**
 * BLOCK / UNBLOCK user
 */
export const toggleBlockUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.isBlocked = !user.isBlocked;
  await user.save();

  res.json({
    message: user.isBlocked ? "User blocked" : "User unblocked",
    user,
  });
};

/**
 * DELETE user
 */
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User deleted" });
};
