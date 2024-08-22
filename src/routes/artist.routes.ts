import { Router } from "express";
import { verifyToken } from "../utils/token";
import {
  createArtistController,
  deleteArtistController,
  getArtistByIdController,
  getArtistsController,
  updateArtistController,
} from "../controllers/artist.controllers";
import { createArtistMiddleware } from "../middlewares/artist.middlewares";

const artistRouter = Router();

artistRouter.post(
  "/create-artist",
  verifyToken,
  createArtistMiddleware,
  createArtistController
);
artistRouter.patch(
  "/update-artist/:artistId",
  verifyToken,
  updateArtistController
);
artistRouter.get("/get-artist", getArtistsController);
artistRouter.get("/get-artist/:artistId", getArtistByIdController);
artistRouter.delete(
  "/delete-artist/:artistId",
  verifyToken,
  deleteArtistController
);

export default artistRouter;
