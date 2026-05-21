import { Router } from "express";
import { getUserAccount, userLogin, userLogout, userSignup } from "./user.controller";
import { asyncHandler } from "../../utils/asyncHandler";

const userRouter: Router = Router();

userRouter.post("/login", asyncHandler(userLogin));
userRouter.post("/signup", asyncHandler(userSignup));
userRouter.get("/account", asyncHandler(getUserAccount));
userRouter.get("/logout", asyncHandler(userLogout));

export default userRouter;
