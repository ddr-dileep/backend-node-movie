import { Request, Response } from "express";
import userModel from "../models/auth.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // check if user already registered
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email/username already registered" });
    }

    // create new user with hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ ...req.body, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: "OK", user });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "not ok" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username/password" });
    }

    // compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username/password" });
    }
    // generateToken
    const token = await generateToken({ id: user._id, email: user.email });
    res.status(200).json({ message: "OK", token });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "not ok" });
  }
};

export const getUserInfoController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { email, id } = req.user;
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "ok", user });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { id } = req.user;
    const { username, email } = req.body;
    const updatedUser = await userModel
      .findByIdAndUpdate(id, { username, email }, { new: true })
      .select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "ok", user: updatedUser });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUserController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { id } = req.user;
    await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error" });
  }
};
