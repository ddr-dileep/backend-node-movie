import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    gender: { type: String },
    email: { type: String, unique: true, sparse: true },
    dob: { type: String },
    role: {
      type: String,
      enum: ["actor", "actress", "producer", "director", "employee"],
      required: true,
    },
    image: {
      type: String,
      default:
        "https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    },
    description: { type: String },
    nickname: { type: String },
    phone: { type: String, unique: true, sparse: true },
    address: { type: String },
    hobbies: [{ type: String }],
    awards: [{ type: String }],
    socialSites: [
      {
        platform: { type: String },
        url: { type: String },
      },
    ],
    tags: [{ type: String }],
    movies: [{ type: mongoose.Types.ObjectId, ref: "Movie" }],
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const artistModel = mongoose.model("Artist", artistSchema);

export default artistModel;
