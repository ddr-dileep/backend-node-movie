import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";

export const generateToken = async (data: any) => {
  const token = await JWT.sign(data, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
  return token;
};

export const verifyToken = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const user: any = JWT.verify(token, process.env.JWT_SECRET!);
  if (!user) {
    return res.status(403).json({ message: "Access denied. Invalid token." });
  }

  req.user = user;

  next();
};
