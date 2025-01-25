import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import RecipeModal from "../components/RecipeModal";

const RecipeCard = ({ title, imageUrl, description, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
      <div className="flex justify-end p-4 space-x-4">
        <button className="text-blue-500 hover:text-blue-700" onClick={onEdit}>
          <FiEdit />
        </button>
        <button className="text-red-500 hover:text-red-700" onClick={onDelete}>
          <FiTrash />
        </button>
      </div>
    </div>
  );
};

const ManageRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/recipe/getAllRecipe`)
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleAddRecipe = () => {
    setCurrentRecipe(null);
    setIsModalOpen(true);
  };

  const handleEditRecipe = (recipe) => {
    setCurrentRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleDeleteRecipe = (recipeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirmDelete) return;
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/recipe/deleteRecipe/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then(() => {
        setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (formData) => {
    if (currentRecipe) {
      axios
        .put(
          `${process.env.REACT_APP_BACKEND_URL}/recipe/updateRecipe/${currentRecipe._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((response) => {
          setRecipes(
            recipes.map((recipe) =>
              recipe._id === response.data._id ? response.data : recipe
            )
          );
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/recipe/addRecipe`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((response) => {
          setRecipes([...recipes, response.data]);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center"
          onClick={handleAddRecipe}
        >
          <FaPlus className="mr-2" /> Add Recipe
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            title={recipe.title}
            imageUrl={recipe.imageUrl}
            description={recipe.introduction}
            onEdit={() => handleEditRecipe(recipe)}
            onDelete={() => handleDeleteRecipe(recipe._id)}
          />
        ))}
      </div>
      <RecipeModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={currentRecipe}
      />
    </div>
  );
};

export default ManageRecipes;
