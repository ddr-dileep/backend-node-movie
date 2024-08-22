import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    gender: { type: String },
    email: { type: String },
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
    phone: { type: String },
    address: { type: String },
    hobbies: [{ type: String }],
    awards: [{ type: String }],
    socialSites: [],
    tags: [{ type: String }],
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const artistModel = mongoose.model("Artist", artistSchema);

export default artistModel;
