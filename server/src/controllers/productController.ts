import { Request, Response } from "express";
import { UserAuthInfoRequest } from "../utils/types/modelTypes";
import Product from "../models/Product";
import User from "../models/User";
import AppError from "../utils/AppError";

//GET - /api/products/:sellingGroup
//get products based of categories
export const getProducts = async (req: Request, res: Response) => {
  const { sellingGroup } = req.params;
  const { search, productType, sport, brand, productCollection } = req.query;
  const products = await Product.find({
    $and: [
      { sellingGroup: sellingGroup },
      search?.length && typeof search === "string" ? {title: new RegExp(search, 'gi')} : {},
      productType?.length ? { productType } : {},
      sport?.length ? { sport } : {},
      brand?.length ? { brand } : {},
      productCollection?.length ? { productCollection } : {},
    ],
  });

  res.status(200).json({ products: products });
};

//GET - /api/products/details/:product_id
//get product details
export const getProductDetails = async (req: Request, res: Response) => {
  try {
    const { product_id } = req.params;
    const product = await Product.findById(product_id).populate("reviews");
    if (product) {
      res.status(200).json({ product: product });
    } else {
      res.status(200).json({});
    }
  } catch (err) {
    throw new AppError("Page not found.", 404);
  }
};

//POST - /api/products/new
//create new product
export const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  const newProduct = new Product(productData);
  await newProduct.save();
  res.status(200).json({ newProduct: newProduct });
};

//PUT - /api/products/:product_id
//update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProductData = req.body;
    const { productId } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductData
    );
    if (updatedProduct) {
      await updatedProduct.save();
      res.status(200).json({ updatedProduct: updatedProduct });
    }
  } catch (err) {
    throw new AppError("Product.", 404);
  }
};

//DELETE - /api/products/:product_id
//delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) {
      res.status(200).json({ message: "Successfully deleted a product." });
    }
  } catch (err) {
    throw new AppError("Product found.", 404);
  }
};

//GET - /api/products/details/:product_id/favourites
//add or remove a product from favourites
export const favourites = async (req: UserAuthInfoRequest, res: Response) => {
  try {
    const product_id = req.params.product_id;
    const favouriteProduct = await Product.findById(product_id);
    if (favouriteProduct) {
      const user = await User.findById(req.user._id);

      if (
        user.favouriteProducts.length &&
        user.favouriteProducts.find((product: any) =>
          product._id.equals(product_id)
        )
      ) {
        await user.updateOne(
          { $pull: { favouriteProducts: product_id } },
          { upsert: true }
        );
        return res.status(200).json({ removed_id: product_id });
      }
      await user.updateOne(
        { $push: { favouriteProducts: favouriteProduct } },
        { upsert: true }
      );
      return res.status(200).json({ product: favouriteProduct });
    }
  } catch (err) {
    res.status(404).send({ err_message: "Product not found." });
  }
};

export const addToCart = async (req: UserAuthInfoRequest, res: Response) => {
  try {
    const { product_id } = req.params;
    const product = await Product.findById(product_id);
    const user = await User.findById(req.user._id).populate({
      path: "cart",
      populate: {
        path: "items",
        populate: {
          path: "product",
          populate: "product",
        },
      },
    });

    const foundItemIndex = user.cart.items.findIndex(
      (item: { quantity: number; product: any }) =>
        item.product._id.toString() === product_id
    );

    user.cart.totalAmount += parseFloat(product.price);
    if (foundItemIndex >= 0) {
      user.cart.items[foundItemIndex].quantity += 1;
    } else {
      user.cart.items.push({ quantity: 1, product });
    }
    await user.save();

    res.status(200).json({ product });
  } catch (err) {
    throw new AppError("error", 400);
  }
};

export const removeFromCart = async (
  req: UserAuthInfoRequest,
  res: Response
) => {
  try {
    const { product_id } = req.params;
    const product = await Product.findById(product_id);
    const user = await User.findById(req.user._id).populate({
      path: "cart",
      populate: {
        path: "items",
        populate: {
          path: "product",
          populate: "product",
        },
      },
    });

    const foundItemIndex = user.cart.items.findIndex(
      (item: { quantity: number; product: any }) =>
        item.product._id.toString() === product_id
    );

    user.cart.totalAmount -= parseFloat(product.price);
    user.cart.items[foundItemIndex].quantity -= 1;
    if (user.cart.items[foundItemIndex].quantity === 0) {
      user.cart.items = user.cart.items.filter(
        (item: { quantity: number; product: any }) =>
          item.product._id.toString() !== product_id
      );
    }

    await user.save();

    res.status(200).json({ product });
  } catch (err) {
    throw new AppError("error", 400);
  }
};
