const mongoose = require("mongoose");

let ProductSchema = new mongoose.Schema(
  {
    vendor_Id: String,
    vendor_Name: String,
    vendor_Email: String,
    product_Id: Number,
    productName: String,
    imgUrl: Object,
    category: String,
    quantity: Number,
    price: Number,
    shortDesc: String,
    description: String,
    reviews: Array,
    avgRating: Number,
  },
  { collection: "products" }
);

let ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;
