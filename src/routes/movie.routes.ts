import { Router } from "express";
import { verifyToken } from "../utils/token";
import {
  createMovieController,
  deleteMovieController,
  getAllMoviesController,
  getMovieController,
  updateMovieController,
} from "../controllers/movie.controllers";
import { createMovieMiddleware } from "../middlewares/movie.middlewares";

const movieRouter = Router();

movieRouter.get("/get-all", getAllMoviesController);
movieRouter.get("/:movieId", getMovieController);
movieRouter.post(
  "/create",
  createMovieMiddleware,
  verifyToken,
  createMovieController
);
movieRouter.patch("/update/:movieId", verifyToken, updateMovieController);
movieRouter.delete("/delete/:movieId", verifyToken, deleteMovieController);

export default movieRouter;
