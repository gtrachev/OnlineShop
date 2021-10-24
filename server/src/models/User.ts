import mongoose, { PassportLocalSchema } from "mongoose";
const Schema = mongoose.Schema;
import passportLocalMongoose from "passport-local-mongoose";

const userSchema: PassportLocalSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
  favouriteProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  cart: {
    totalAmount: { type: Number, default: 0 },
    items: [
      {
        quantity: {
          type: Number,
          default: true,
        },
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
});

userSchema.plugin(passportLocalMongoose);

const User: any = mongoose.model("User", userSchema);

export default User;
