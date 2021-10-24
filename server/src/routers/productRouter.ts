import express from "express";
import isLoggedIn from "../middleware/isLoggedIn";
import { validateProduct } from "../middleware/joiValidation";
import asyncWrap from "../utils/asyncWrap";
import * as productController from "../controllers/productController";
const productsRouter = express.Router();

//GET - /api/products/:sellingGroup
//get products based of categories
productsRouter.get("/:sellingGroup", asyncWrap(productController.getProducts));

//GET - /api/products/details/favourites/:product_id
//add or reomve product from favourites
productsRouter.get(
  "/details/favourites/:product_id",
  isLoggedIn,
  asyncWrap(productController.favourites)
);

//GET - /api/products/details/addToCart/:product_id
//add product to cart
productsRouter.get(
  "/details/addToCart/:product_id",
  isLoggedIn,
  asyncWrap(productController.addToCart)
);

//GET - /api/products/details/removeFromCart/:product_id
//remove product from cart
productsRouter.get(
  "/details/removeFromCart/:product_id",
  isLoggedIn,
  asyncWrap(productController.removeFromCart)
);

//GET - /api/products/details/:product_id
//get product details
productsRouter.get(
  "/details/:product_id",
  asyncWrap(productController.getProductDetails)
);

//POST - /api/products/new
//create new product
productsRouter.post(
  "/new",
  isLoggedIn,
  validateProduct,
  asyncWrap(productController.createProduct)
);

//PUT - /api/products/:product_id
//update product
productsRouter.put(
  "/:product_id",
  isLoggedIn,
  validateProduct,
  asyncWrap(productController.updateProduct)
);

//DELETE - /api/products/:product_id
//delete product
productsRouter.delete(
  "/:product_id",
  isLoggedIn,
  asyncWrap(productController.deleteProduct)
);

export default productsRouter;
