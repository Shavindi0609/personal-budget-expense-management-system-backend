import { Request, Response, NextFunction } from "express";

// export const adminOnly = (req: any, res: Response, next: NextFunction) => {
//   if (req.user?.role !== "admin") {
//     return res.status(403).json({ message: "Admin access required" });
//   }
//   next();
// };


export const adminOnly = (req: any, res: any, next: any) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
