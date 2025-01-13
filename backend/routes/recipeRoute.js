const express = require("express");
const recipeController = require("../controller/recipeController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Public route: Get all recipes
router.get("/getAllRecipe", recipeController.getAllRecipes);
router.get("/getRecipeById/:id", recipeController.getRecipeById);

// Admin routes
router.post("/addRecipe", verifyAdmin, recipeController.addRecipe);
router.put("/updateRecipe/:id", verifyAdmin, recipeController.updateRecipe);
router.delete("/deleteRecipe/:id", verifyAdmin, recipeController.deleteRecipe);

module.exports = router;
