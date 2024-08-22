import { Router } from "express";
import { verifyToken } from "../utils/token";
import { getAllMoviesController, getMovieController } from "../controllers/movie.controllers";

const movieRouter = Router();

movieRouter.get("/get-all", getAllMoviesController);
movieRouter.get("/:movieId", getMovieController);

export default movieRouter;
