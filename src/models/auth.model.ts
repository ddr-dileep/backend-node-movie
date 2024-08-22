import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  role: "user" | "admin";
}

const userSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default:
      "https://png.pngtree.com/png-vector/20240611/ourmid/pngtree-user-profile-icon-image-vector-png-image_12640450.png",
  },
});

const userModel = mongoose.model<IUser>("User", userSchema);

export default userModel;
