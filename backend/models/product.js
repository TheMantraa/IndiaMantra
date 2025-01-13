const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  containsCaffeine: {
    type: Boolean,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  benefits: {
    type: [String],
    required: true,
  },
  brewingInstructions: {
    type: String,
    required: true,
  },
  proTips: {
    type: String,
    default: "",
  },
  images: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  buyUrl: {
    type: String,
    required: true,
  },
  reviews: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          min: 0,
          max: 5,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        profileImage: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
  faqs: {
    type: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product =
  mongoose.model.Product || mongoose.model("Product", ProductSchema);
module.exports = Product;
