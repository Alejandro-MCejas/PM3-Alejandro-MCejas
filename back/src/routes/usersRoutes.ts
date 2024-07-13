import { Router } from "express";
import { getUsersController, getUserByIdController, registerUserController, loginUserController } from "../controllers/usersController";


const userRouter: Router = Router();

userRouter.get("/", getUsersController);
userRouter.get("/:id", getUserByIdController);
userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);

export default userRouter;