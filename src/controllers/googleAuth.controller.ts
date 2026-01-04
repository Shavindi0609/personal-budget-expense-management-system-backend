import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User"; // ඔයාගේ User model
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    console.log("Received token:", token); // <-- debug
    if (!token) return res.status(400).json({ message: "Token is required" });
    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("Payload:", payload); // <-- debug
    if (!payload) return res.status(400).json({ message: "Invalid token" });

    const { email, name } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // If new user, create one (default role: "user")
      user = await User.create({ name, email, role: "user", password: "" });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({
      accessToken,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Google login failed" });
  }
};
