import { Request, Response } from "express";
import commentModel from "../models/comment.model";
import movieModel from "../models/movie.model";

// Controller to create a new comment
export const createCommentController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { text, movieId } = req.body;
    const { id: userId } = req.user;

    // Check if movie exists
    const movieExists = await movieModel.findById(movieId);
    if (!movieExists) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const newComment = await commentModel.create({
      text,
      movie: movieId,
      user: userId,
    });

    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (error: any) {
    res.status(500).json({ error: error });
  }
};

// Controller to reply to a comment
export const replyCommentController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { text } = req.body;
    const { commentId } = req.params;
    const { id: userId } = req.user;

    const parentComment = await commentModel.findById(commentId);

    if (!parentComment) {
      return res.status(404).json({ message: "Parent comment not found" });
    }

    const reply: any = await commentModel.create({
      text,
      movie: parentComment.movie,
      user: userId,
      parentComment: parentComment?._id,
    });

    parentComment.replies.push(reply._id);
    await parentComment.save();

    res.status(201).json({ message: "Reply added", comment: reply });
  } catch (error: any) {
    res.status(500).json({ error });
  }
};

// Controller to like or dislike a comment
export const reactToCommentController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { commentId } = req.params;
    const { reactionType } = req.body; // "like" or "dislike"
    const { id: userId } = req.user;

    const comment = await commentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const likeIndex = comment.likes.indexOf(userId);
    const dislikeIndex = comment.dislikes.indexOf(userId);

    if (reactionType === "like") {
      if (likeIndex === -1) comment.likes.push(userId);
      if (dislikeIndex !== -1) comment.dislikes.splice(dislikeIndex, 1);
    } else if (reactionType === "dislike") {
      if (dislikeIndex === -1) comment.dislikes.push(userId);
      if (likeIndex !== -1) comment.likes.splice(likeIndex, 1);
    }

    await comment.save();

    res.status(200).json({ message: "Reaction recorded", comment });
  } catch (error: any) {
    res.status(500).json({ error: error });
  }
};

// Controller to fetch all comments for a movie
export const getCommentsForMovieController = async (
  req: Request,
  res: Response
) => {
  try {
    const { movieId } = req.params;

    const comments = await commentModel
      .find({ movie: movieId, parentComment: null })
      .populate("user", "username")
      .populate({
        path: "replies",
        populate: { path: "user", select: "username" },
      })
      .exec();

    res.status(200).json({ comments });
  } catch (error: any) {
    res.status(500).json({ error });
  }
};
