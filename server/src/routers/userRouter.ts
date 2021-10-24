import passport from "passport";
import express from "express";
import * as userController from "../controllers/userController";
import asyncWrap from "../utils/asyncWrap";
import isLoggedIn from "../middleware/isLoggedIn";
import { validateUser } from "../middleware/joiValidation";
const userRouter = express.Router();

//GET - /api/user/current
//return current user
userRouter.get("/current", userController.getCurrentUser);

//POST - /api/user/login
//login user
userRouter.post("/login", passport.authenticate("local"), userController.loginUser);

//POST - /api/user/register
//register user
userRouter.post("/register", validateUser, asyncWrap(userController.registerUser));

//GET - /api/user/logout
//logout user
userRouter.get("/logout", isLoggedIn, userController.logoutUser);

//GET - /api/user/checkUser/:user
//check if user data is valid
userRouter.post("/checkUser", validateUser , userController.checkUser);

//GET - /api/user/checkUsername/:username
//check if username is available
userRouter.get("/checkUsername/:username", userController.checkUsername);

export default userRouter;