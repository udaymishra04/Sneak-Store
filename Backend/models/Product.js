// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String, // store image URLs
    },
  ],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: String,
    enum: ["sneakers", "running", "casual"],
    default: "sneakers",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
