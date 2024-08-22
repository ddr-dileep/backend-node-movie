import { NextFunction, Request, Response } from "express";

export const createArtistMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({
      name: name ? undefined : "Artist name is required",
      role: role ? undefined : "Artist role is required",
    });
  }

  next();
};
