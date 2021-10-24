if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import express, { Application, Request, Response, NextFunction } from "express";
const app: Application = express();
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
const LocalStrategy = require("passport-local");
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import sessionConfig from "./utils/sessionConfig";
import { mockProducts } from "./mockData";
import Product from "./models/Product";
import User from "./models/User";
import AppError from "./utils/AppError";
import productsRouter from "./routers/productRouter";
import reviewRouter from "./routers/reviewRouter";
import userRouter from "./routers/userRouter";

const dbURL =
  process.env.REACT_APP_DB_URL || "mongodb://localhost:27017/onlineShop";
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => {
  console.log("Database connected.");
});

app.set("trust proxy", 1);
app.use(cors({ credentials: true, origin: "http://localhost:3001" }));

app.use(session(sessionConfig));
declare module "express-session" {
  interface SessionData {
    returnTo: string;
  }
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Security
app.use(
  ExpressMongoSanitize({
    replaceWith: "_",
  })
);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/api/products", productsRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/user", userRouter);

app.get("/mock", (req: Request, res: Response) => {
  const getMockData = () => {
    mockProducts.forEach(async (product: any) => {
      const newProduct = new Product(product);
      await newProduct.save();
    });
  };
  getMockData();
  res.send("mock");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError("Page not found.", 404));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).json({ err_message: err.message });
});

const port = process.env.REACT_APP_PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
