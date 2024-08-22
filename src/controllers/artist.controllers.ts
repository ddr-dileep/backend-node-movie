import { Request, Response } from "express";
import userModel from "../models/auth.model";
import artistModel from "../models/artist.models";

// Controller to create an artist
export const createArtistController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { id } = req?.user;
    const userDetails: any = await userModel.findById(id).lean();

    if (!userDetails) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const { isAdmin, isSuperAdmin, _id: userId } = userDetails;
    if (!(isAdmin || isSuperAdmin)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to create an artist" });
    }

    const existingArtist = await artistModel
      .findOne({ name: req.body.name })
      .lean();

    if (existingArtist) {
      return res.status(400).json({ message: "Artist name already exists" });
    }

    const newArtist = await artistModel.create({
      ...req.body,
      createdBy: userId,
    });

    res
      .status(201)
      .json({ message: "Artist created successfully", artist: newArtist });
  } catch (error) {
    res.status(500).json({ success: "not ok" });
  }
};

// Controller to update an artist
export const updateArtistController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { artistId } = req.params;
    const { id } = req.user;
    const userDetails: any = await userModel.findById(id).lean();

    if (!userDetails) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const { isAdmin, isSuperAdmin } = userDetails;
    if (!(isAdmin || isSuperAdmin)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update an artist" });
    }

    const artistToUpdate = await artistModel.findById(artistId);
    if (!artistToUpdate) {
      return res.status(404).json({ message: "Artist not found" });
    }

    const updatedArtist = await artistModel.findByIdAndUpdate(
      artistId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: "Artist updated successfully", artist: updatedArtist });
  } catch (error) {
    res.status(500).json({ success: "not ok" });
  }
};

// Controller to get all artist without validation
export const getArtistsController = async (req: Request, res: Response) => {
  try {
    const artists = await artistModel.find().lean();
    res.status(200).json({ success: true, count: artists?.length, artists });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// Controller to get single artist by id without validation
export const getArtistByIdController = async (req: Request, res: Response) => {
  try {
    const { artistId } = req.params;
    const artist = await artistModel.findById(artistId).lean();
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.status(200).json({ success: true, artist });
  } catch (error) {}
};

// Controller to delete an artist
export const deleteArtistController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { artistId } = req.params;
    const { id } = req.user;
    const userDetails: any = await userModel.findById(id).lean();

    if (!userDetails) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const { isAdmin, isSuperAdmin } = userDetails;
    if (!(isAdmin || isSuperAdmin)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete an artist" });
    }

    const artistToDelete = await artistModel.findById(artistId);
    if (!artistToDelete) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.status(200).json({ message: "Artist deleted successfully" });
  } catch (error) {}
};
