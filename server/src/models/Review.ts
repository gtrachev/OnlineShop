import mongoose, { PassportLocalSchema } from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema: PassportLocalSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  body: {
    type: String,
  },
  rating: {
    type: Number,
    required: false,
  },
});

const Review: any = mongoose.model("Review", reviewSchema);

export default Review;
