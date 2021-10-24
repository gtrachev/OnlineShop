import mongoose, { PassportLocalSchema } from "mongoose";
const Schema = mongoose.Schema;

const brandSchema: PassportLocalSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

const Brand: any = mongoose.model("Brand", brandSchema);

export default Brand;