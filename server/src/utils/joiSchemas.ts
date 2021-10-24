import Joi from "joi";
import { BrandTypes, ProductCollectionTypes, ProductTypeTypes, SellingGroupTypes, SportTypes } from "./types/categoryTypes";

export const productJoiSchema = Joi.object({
  title: Joi.string().alphanum().max(30).min(1).required(),
  price: Joi.number().min(0.01).required(),
  description: Joi.string().alphanum().max(1000).min(1).required(),
  images: Joi.array().items(Joi.string().alphanum().max(300).min(1)).required(),
  sellingGroup: Joi.string().allow(...Object.values(SellingGroupTypes)).required(),
  productType: Joi.string().allow(...Object.values(ProductTypeTypes)).required(),
  sport: Joi.string().allow(...Object.values(SportTypes)),
  productCollection: Joi.string().allow(...Object.values(ProductCollectionTypes)),
  brand: Joi.string().allow(...Object.values(BrandTypes)),
});

export const userJoiSchema = Joi.object({
  username: Joi.string().max(100).min(4).required(),
  password: Joi.string().min(4).required()
})

export const reviewJoiSchema = Joi.object({
  body: Joi.string().alphanum().max(500).min(1).required(),
  rating: Joi.number().min(1).max(5)
});