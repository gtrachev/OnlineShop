import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { productJoiSchema, reviewJoiSchema, userJoiSchema } from "../utils/joiSchemas";

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productData = req.body;
  const { error } = productJoiSchema.validate(productData);
  if (!error) {
    return next();
  }
  const err_message = error.details.map(el => el.message).join(", ");
  throw new AppError(err_message, 400);
};

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.body;
  const { error } = userJoiSchema.validate(userData);
  if (!error) {
    return next();
  }
  const err_message = error.details.map(el => el.message).join(", ");
  throw new AppError(err_message, 400);
};

export const validateReview = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reviewData = req.body;
  const { error } = reviewJoiSchema.validate(reviewData);
  if (!error) {
    return next();
  }
  const err_message = error.details.map(el => el.message).join(", ");
  throw new AppError(err_message, 400);
};
