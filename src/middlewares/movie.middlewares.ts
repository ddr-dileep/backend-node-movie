import { NextFunction, Request, Response } from "express";

export const createMovieMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      name: name ? undefined : "Movie name is required",
    });
  }

  next();
};
