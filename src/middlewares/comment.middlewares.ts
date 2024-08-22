import { NextFunction, Request, Response } from "express";

export const addCommentMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { test } = req.body;

  if (!test) {
    return res.status(400).json({
      test: test ? undefined : "Movie name is required",
    });
  }

  next();
};
