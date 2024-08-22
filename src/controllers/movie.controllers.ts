import { Request, Response } from "express";
import movieModel from "../models/movie.model";
import userModel from "../models/auth.model";

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

export const createMovieController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { id } = req.user;
    const userDetails: any = await userModel.findById(id).lean();

    if (!userDetails) {
      return res.status(401).json({ message: "User does not exits" });
    }

    const existingMovie = await movieModel
      .findOne({ name: req.body.name })
      .lean();
    if (existingMovie) {
      return res.status(400).json({ message: "Movie name already exists" });
    }

    const { isAdmin, isSuperAdmin, _id: userId } = userDetails;
    if (!(isAdmin || isSuperAdmin)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to create movie" });
    }
    const newMovie = await movieModel.create({
      ...req.body,
      createdBy: userId,
      updatedBy: userId,
    });
    const createdMovie = await newMovie.save();
    res
      .status(200)
      .json({ message: "Movie created successfully", movie: createdMovie });
  } catch (error) {
    res.status(404).json({ message: "not ok" });
  }
};

export const updateMovieController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { id } = req.user;
    const userDetails: any = await userModel.findById(id).lean();

    if (!userDetails) {
      return res.status(401).json({ message: "User does not exits" });
    }

    const { isAdmin, isSuperAdmin, _id: userId } = userDetails;
    if (!(isAdmin || isSuperAdmin)) {
      req.body = {
        ...req.body,
        updatedBy: userId,
      };
      return res
        .status(403)
        .json({ message: "You are not authorized to update movie" });
    }

    // check movie is already exists or not
    const { movieId } = req.params;
    const existingMovie = await movieModel.findById(movieId);
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const updatedMovie = await movieModel.findByIdAndUpdate(
      movieId,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res
      .status(200)
      .json({ message: "Movie updated successfully", movie: updatedMovie });
  } catch (error) {
    res.status(404).json({ message: "not ok", error });
  }
};

export const deleteMovieController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { id } = req.user;
    const userDetails: any = await userModel.findById(id).lean();

    if (!userDetails) {
      return res.status(401).json({ message: "User does not exits" });
    }

    const { isAdmin, isSuperAdmin } = userDetails;
    if (!(isAdmin || isSuperAdmin)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete movie" });
    }

    const { movieId } = req.params;
    const deletedMovie = await movieModel.findByIdAndDelete(movieId);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" }); // Movie not found error handling
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "not ok" });
  }
};
