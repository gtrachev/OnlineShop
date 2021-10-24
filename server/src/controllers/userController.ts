import { Request, Response } from "express";
import User from "../models/User";
import AppError from "../utils/AppError";

//GET - /api/user/current
//return current user
export const getCurrentUser = async (req: any, res: Response) => {
  if (req.user) {
    const user = await User.findById(req.user._id).populate([
      { path: "favouriteProducts", populate: "favouriteProducts" },
      {
        path: "cart",
        populate: {
          path: "items",
          populate: {
            path: "product",
          },
        },
      },
    ]);
    res.status(200).json({ user });
  } else {
    res.status(200).json({ message: "User not logged in" });
    return;
  }
};

//POST - /api/user/login
//login user
export const loginUser = (req: Request, res: Response) => {
  res.status(200).json({ user: req.user });
};

//POST - /api/user/register
//register user
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const registeredUser = await User.register({ username, password }, password);

  req.login(registeredUser, (err) => {
    if (err) {
      throw new AppError("There was a problem logging you in.", 500);
    } else {
      res.status(200).json({ user: registeredUser });
    }
  });
};

//GET - /api/user/logout
//logout user
export const logoutUser = (req: Request, res: Response) => {
  req.logout();
  res.status(200).json({ message: "success" });
};

//GET - /api/user/checkUser
//check if user data is valid
export const checkUser = async (req: Request, res: Response) => {
  const user = req.body;

  const foundUser = await User.findOne({
    username: user.username,
    password: user.password,
  });

  res.status(200).json({ validData: foundUser ? true : false });
};

//GET - /api/user/checkUsername/:username
//check if username is available
export const checkUsername = async (req: Request, res: Response) => {
  const { username } = req.params;

  const foundUser = await User.findOne({ username });
  res.status(200).json({ availableUsername: foundUser ? false : true });
};
