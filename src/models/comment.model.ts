import mongoose, { Schema, Document } from "mongoose";

interface IComment extends Document {
  text: string;
  movie?: mongoose.Types.ObjectId;
  user?: mongoose.Types.ObjectId;
  replies: mongoose.Types.ObjectId[];
  parentComment?: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
  reported: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    text: { type: String, required: true, trim: true },
    movie: { type: mongoose.Types.ObjectId, ref: "Movie", required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    parentComment: { type: mongoose.Types.ObjectId, ref: "Comment" },
    replies: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    reported: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Cascade delete replies when a comment is deleted
commentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const comment = this as IComment;
    await commentModel.deleteMany({ parentComment: comment._id });
    next();
  }
);

const commentModel = mongoose.model<IComment>("Comment", commentSchema);

export default commentModel;
