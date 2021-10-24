import { Request, Response } from "express";
import Review from "../models/Review";

//POST - /api/reviews/product_id/new
//create new review
export const createReview = async (req: Request, res: Response) => {
  const reviewData = req.body;
  const newReview = new Review(reviewData);
  newReview.author = req.user;
  await newReview.save();
  res.status(200).json({ newReview });
};

//DELETE - /api/reviews/:review_id
//delete review
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (deletedReview) {
      res.status(200).json({ message: "Successfully deleted a review." });
    }
  } catch (err) {
    res.status(404).json({ err_message: "Page not found." });
  }
};
