import { Request, Response } from "express";
import movieModel from "../models/movie.model";

export const getAllMoviesController = async (req: Request, res: Response) => {
  try {
    const movies = await movieModel.find().lean();
    res.json({ message: "ok", count: movies?.length, movies });
  } catch (error) {}
};

export const getMovieController = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const movie = await movieModel.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ message: "ok", movie });
  } catch (error) {
    res.status(404).json({ message: "not ok" });
  }
};
