import { NextFunction, Request, Response } from "express";

export const registerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({
      username: username ? undefined : "UserName is required",
      email: email ? undefined : "Email is required",
      password: password ? undefined : "Password is required",
    });
  }

  next();
};

export const loginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      username: username ? undefined : "UserName is required",
      password: password ? undefined : "Password is required",
    });
  }
  next();
};

