import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    throw new AppError("You must be logged in to access this page.", 401);
  }
};

export default isLoggedIn;