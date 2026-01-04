import { Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth.middleware";
import bcrypt from "bcryptjs";

// GET profile
export const getMyProfile = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ user });
};

// UPDATE profile
export const updateMyProfile = async (req: AuthRequest, res: Response) => {
  const { name, email, password } = req.body;

  const updates: any = {};
  if (name) updates.name = name;
  if (email) updates.email = email;

  // ✅ password change (optional)
  if (password) {
    const salt = await bcrypt.genSalt(10);
    updates.password = await bcrypt.hash(password, salt);
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    updates,
    { new: true }
  ).select("-password");

  res.json({ user });
};