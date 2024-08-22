import express from "express";
import { verifyToken } from "../utils/token";
import {
  createCommentController,
  replyCommentController,
  reactToCommentController,
  getCommentsForMovieController,
} from "../controllers/comment.controllers";
import { addCommentMiddleware } from "../middlewares/comment.middlewares";

const router = express.Router();

// create a comment
router.post(
  "/comments",
  verifyToken,
  addCommentMiddleware,
  createCommentController
);

// reply to a comment
router.post("/comments/:commentId/reply", verifyToken, replyCommentController);

// (like/dislike) to a comment
router.post(
  "/comments/:commentId/react",
  verifyToken,
  reactToCommentController
);

// get all comments for a movie
router.get("/movies/:movieId/comments", getCommentsForMovieController);

export default router;
