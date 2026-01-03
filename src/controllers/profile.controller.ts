import { Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth.middleware";

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

  // password change (optional)
  if (password) {
    // ⚠️ if you already hash passwords in auth flow, reuse same logic
    updates.password = password;
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    updates,
    { new: true }
  ).select("-password");

  res.json({ user });
};
