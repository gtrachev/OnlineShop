import express from "express";
import isLoggedIn from "../middleware/isLoggedIn";
import { validateReview } from "../middleware/joiValidation";
import asyncWrap from "../utils/asyncWrap";
import * as reviewController from "../controllers/reviewController";
const reviewRouter = express.Router();

//POST - /api/reviews/product_id/new
//create new review
reviewRouter.post(
  "/:product_id/new",
  isLoggedIn,
  validateReview,
  asyncWrap(reviewController.createReview)
);

//DELETE - /api/reviews/:review_id
//delete review
reviewRouter.delete(
  "/:product_id",
  isLoggedIn,
  validateReview,
  asyncWrap(reviewController.deleteReview)
);

export default reviewRouter;
