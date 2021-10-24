import mongoose, { PassportLocalSchema } from "mongoose";
const Schema = mongoose.Schema;

const categorySchema: PassportLocalSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

const Category: any = mongoose.model("Category", categorySchema);

export default Category;