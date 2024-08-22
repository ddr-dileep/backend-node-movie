import { Router } from "express";
import {
  deleteUserController,
  getUserInfoController,
  loginController,
  registerController,
  updateUserController,
} from "../controllers/auth.controller";
import {
  loginMiddleware,
  registerMiddleware,
} from "../middlewares/auth.controller";
import { verifyToken } from "../utils/token";

const authRouter = Router();

authRouter.post("/register", registerMiddleware, registerController);
authRouter.post("/login", loginMiddleware, loginController);
authRouter.get("/user-info", verifyToken, getUserInfoController);
authRouter.patch("/update", verifyToken, updateUserController);
authRouter.delete("/delete", verifyToken, deleteUserController);

export default authRouter;
