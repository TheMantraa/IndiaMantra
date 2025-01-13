const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  steps: {
    type: [String],
    required: true,
  },
  benefits: {
    type: [String],
    required: true,
  },
  faqs: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model.Recipe || mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
