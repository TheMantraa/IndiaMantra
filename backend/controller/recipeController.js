const Recipe = require("../models/recipe");

// Add a new recipe
const addRecipe = async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json({ message: "Recipe added successfully", recipe });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to add recipe", error: error.message });
  }
};

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(404).json({ message: "No recipes found" });
  }
};

// Get a recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(404).json({ message: "Recipe not found" });
  }
};

// Update a recipe by ID
const updateRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(404).json({ message: "Recipe not found" });
  }
};

// Delete a recipe by ID
const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    await Recipe.findByIdAndDelete(id);
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Recipe not found" });
  }
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
