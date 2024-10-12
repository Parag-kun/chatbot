import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../env-variables";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    res.status(403).json({ success: false, error: "Token unavailable" });

    return;
  }

  try {
    const { userId } = jwt.verify(token, JWT_SECRET) as any;

    res.locals.userId = userId;

    next();

    return;
  } catch (error) {
    res.status(403).json({ success: false, error: "Token invalid" });

    return;
  }
};
