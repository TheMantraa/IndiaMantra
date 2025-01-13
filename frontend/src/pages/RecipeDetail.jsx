import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeTab, setActiveTab] = useState("ingredients");

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/recipe/getRecipeById/${id}`
        );
        setRecipe(response.data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetchRecipe();
  }, [id]);

  const toggleFAQ = (index) => {
    // If the clicked FAQ is already open, close it (set it to null)
    setOpenFAQ(openFAQ === index ? null : index);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  const renderContent = () => {
    if (activeTab === "ingredients") {
      return (
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-base sm:text-lg">
              {ingredient}
            </li>
          ))}
        </ul>
      );
    } else if (activeTab === "steps") {
      return (
        <ol className="list-decimal list-inside text-gray-600 space-y-2">
          {recipe.steps.map((step, index) => (
            <li key={index} className="text-base sm:text-lg">
              {step}
            </li>
          ))}
        </ol>
      );
    } else if (activeTab === "benefits") {
      return (
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {recipe.benefits.map((benefit, index) => (
            <li key={index} className="text-base sm:text-lg">
              {benefit}
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    recipe && (
      <div className="py-8 px-4 min-h-screen ">
        <div className="max-w-6xl mx-auto bg-white rounded-lg  overflow-hidden">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-72 object-cover sm:h-96"
          />
          <div className="p-6">
            <h1 className="text-3xl  font-bold mb-4 text-gray-800 text-center sm:text-4xl baskervville-regular">
              {recipe.title}
            </h1>
            <p className="text-gray-600 text-center font-semibold  text-base sm:text-lg mb-6 ">
              {recipe.introduction}
            </p>
            <div>
              <div className="flex justify-center space-x-4 mb-6">
                <button
                  onClick={() => setActiveTab("ingredients")}
                  className={`px-4 py-2 text-base sm:text-lg font-semibold rounded ${
                    activeTab === "ingredients"
                      ? "bg-[#3C0C1C] text-white"
                      : "bg-[#9b5f74] text-white"
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab("steps")}
                  className={`px-4 py-2 text-base sm:text-lg font-semibold rounded ${
                    activeTab === "steps"
                      ? "bg-[#3C0C1C] text-white"
                      : "bg-[#9b5f74] text-white"
                  }`}
                >
                  Steps to Brew
                </button>
                <button
                  onClick={() => setActiveTab("benefits")}
                  className={`px-4 py-2 text-base sm:text-lg font-semibold rounded ${
                    activeTab === "benefits"
                      ? "bg-[#3C0C1C] text-white"
                      : "bg-[#9b5f74] text-white"
                  }`}
                >
                  Benefits
                </button>
              </div>
              <div className="bg-slate-50 p-4 lg:mx-20 rounded-lg shadow-inner">
                {renderContent()}
              </div>
            </div>

            {recipe.faqs.length > 0 && (
              <div className="mt-8 px-4 lg:px-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {recipe.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 shadow-sm"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full text-left text-lg font-medium text-gray-800 flex justify-between items-center"
                      >
                        <span>{faq.question}</span>
                        <span
                          className={`transform transition-transform ${
                            openFAQ === index ? "rotate-180" : ""
                          }`}
                        >
                          ▼
                        </span>
                      </button>
                      {openFAQ === index && (
                        <div className="mt-2 text-gray-600">{faq.answer}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default RecipeDetail;
