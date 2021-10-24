import { Request } from "express";
import { ObjectId } from "mongoose";
import {
  BrandEnum,
  ProductCollectionEnum,
  ProductTypeEnum,
  SellingGroupEnum,
  SportEnum,
} from "./categoryTypes";

export interface UserType {
  _id: ObjectId;
  username: string;
  password: string;
  favouriteProducts: ObjectId[];
  cart: {
    quantity: number;
    items: ProductType[];
  };
}

export interface ProductType {
  _id: ObjectId;
  title: string;
  price: number;
  description: string;
  poster: string;
  images: string[];
  reviews: ObjectId[];
  sellingGroup: SellingGroupEnum;
  productType: ProductTypeEnum;
  sport?: SportEnum;
  productCollection?: ProductCollectionEnum;
  brand?: BrandEnum;
}

export interface ProductInputType {
  title: string;
  price: number | null;
  description: string;
  poster: string;
  images: string[];
  sellingGroup: SellingGroupEnum;
  productType: ProductTypeEnum;
  sport?: SportEnum | "";
  productCollection?: ProductCollectionEnum | "";
  brand?: BrandEnum | "";
}

export interface ReviewType {
  _id: ObjectId;
  author: ObjectId;
  body: string;
  rating: number;
}

export interface UserAuthInfoRequest extends Request {
  user: UserType;
}
