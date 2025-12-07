import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashed });
  res.status(201).json({ message: "Registered", userId: user._id });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing fields" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id, role: user.role });

  res.json({ accessToken, refreshToken });
};

export const refreshToken = (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: "Refresh token required" });

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as any;
    const accessToken = generateAccessToken({ id: payload.id, role: payload.role });
    res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

export const me = async (req: Request, res: Response) => {
  // note: auth middleware sets req.user
  const userId = (req as any).user?.id;
  if (!userId) return res.status(401).json({ message: "Not authorized" });

  const user = await User.findById(userId).select("-password");
  res.json({ user });
};
