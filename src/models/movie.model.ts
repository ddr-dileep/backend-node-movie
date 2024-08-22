import mongoose, { Schema } from "mongoose";

const movieSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  artist: [{ type: mongoose.Types.ObjectId, ref: "Artist" }],
  releaseDate: { type: String },
  trailerLink: { type: String },
  movieLink: { type: String },
  duration: { type: String },
  language: { type: String },
  country: { type: String },
  boxOffice: { type: String },
  isPublished: { type: Boolean, default: false },
  productionCompany: [],
  rating: { type: Number, default: 0 },
  tags: [{ type: String }],
  directors: [{ type: mongoose.Types.ObjectId, ref: "Artist" }],
  producer: [{ type: mongoose.Types.ObjectId, ref: "Artist" }],
  createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Types.ObjectId, ref: "User" },
});

const movieModel = mongoose.model("Movie", movieSchema);

export default movieModel;
