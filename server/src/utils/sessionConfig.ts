import { SessionOptions } from "express-session";

const MongoStore = require("connect-mongo");

const dbUrl =
  process.env.REACT_APP_DB_URL || "mongodb://localhost:27017/onlineShop";
const secret = process.env.REACT_APP_SESSION_SECRET || "backupsecret";

const sessionStore = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: secret,
  },
});

sessionStore.on("error", (e: Error) => {
  console.log("SESSION STORE ERROR!", e);
});

const sessionConfig: SessionOptions = {
  store: sessionStore,
  name: "online-session",
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

export default sessionConfig;
