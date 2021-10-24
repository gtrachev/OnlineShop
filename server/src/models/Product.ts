import mongoose, { ObjectId, PassportLocalSchema } from "mongoose";
import {
  BrandEnum,
  ProductCollectionEnum,
  ColorEnum,
  ColorTypes,
  ProductTypeEnum,
  SellingGroupEnum,
  SportEnum,
} from "../utils/types/categoryTypes";
import Review from "./Review";
const Schema = mongoose.Schema;

const productSchema: PassportLocalSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: "Review",
  },
  sellingGroup: {
    type: SellingGroupEnum,
    required: true,
  },
  productType: {
    type: ProductTypeEnum,
    required: true,
    default: "",
  },
  sport: {
    type: SportEnum,
    required: false,
    default: "",
  },
  productCollection: {
    type: ProductCollectionEnum,
    required: false,
    default: "",
  },
  brand: {
    type: BrandEnum,
    required: false,
    default: "",
  },
});

productSchema.post("findOneAndDelete", (doc) => {
  if (doc.reviews) {
    doc.reviews.forEach((reviewId: ObjectId) => {
      Review.findByIdAndDelete(reviewId);
    });
  }
});

const Product: any = mongoose.model("Product", productSchema);

export default Product;
