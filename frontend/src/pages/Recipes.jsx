import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const handleRecipeClick = (id) => {
    navigate(`/recipes/${id}`);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/recipe/getAllRecipe`)
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-[#3C0C1C] sm:text-left baskervville-regular">
          RECIPES
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="group overflow-hidden transition duration-700"
              onClick={() => handleRecipeClick(recipe._id)}
            >
              <div className="overflow-hidden">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-52- sm:h-56 object-cover rounded-md group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="my-4">
                <h2 className="sm:text-2xl lg:text-3xl font-bold text-gray-800 group-hover:underline cursor-pointer">
                  {recipe.title}
                </h2>
                <p className="text-xl sm:text-md text-gray-600 mt-3">
                  {recipe.introduction}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
