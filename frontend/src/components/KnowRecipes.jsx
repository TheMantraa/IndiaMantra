import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KnowRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                const backendUrl = process.env.REACT_APP_BACKEND_URL;
                if (!backendUrl) {
                    throw new Error("Backend URL is not defined");
                }
                const response = await axios.get(`${backendUrl}/recipe/getAllRecipe`);
                setRecipes(response.data);
            } catch (err) {
                setError(err.message || "An error occurred while fetching recipes.");
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    if (loading) {
        return <p>Loading recipes...</p>;
    }

    if (error) {
        return <p>Error fetching recipes: {error}</p>;
    }

    // Sort the recipes from newest to oldest based on createdAt (descending order)
    const sortedRecipes = [...recipes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <section className="bg-[#bbb1a6] py-16">
            <div className="container mx-auto px-4 sm:px-8 lg:px-40">
                <h2 className="text-3xl font-extrabold baskervville-regular text-[#623c49] mb-12 text-center">
                    MANTRA INFUSIONS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedRecipes.slice(0, 3).map((recipe) => {
                        // Limit the title to 50 characters
                        const truncatedTitle = recipe.title.length > 50
                            ? `${recipe.title.slice(0, 39)}...`
                            : recipe.title;

                        // Limit the introduction text to 120 characters
                        const introText = recipe.introduction.length > 120
                            ? `${recipe.introduction.slice(0, 120)}...`
                            : recipe.introduction;

                        return (
                            <div
                                key={recipe._id || recipe.id}
                                className="bg-[#623c49] rounded-lg shadow-md overflow-hidden"
                            >
                                <img
                                    src={recipe.imageUrl}
                                    alt={`Recipe titled ${recipe.title}`}
                                    className="w-full h-48 object-cover p-4"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-2 text-[#eee9e2]">
                                        {truncatedTitle}
                                    </h2>
                                    <div className="text-[#eee9e2]">
                                        {introText}
                                    </div>
                                </div>
                                <div className="flex mb-4 items-center justify-center">
                                    <button
                                        className="text-[#bbb1a6] px-4 text-xl font-semibold hover:scale-105 transition hover:text-[#623c49]"
                                        onClick={() => navigate(`/recipes/${recipe._id}`)}
                                    >
                                        Read Now →
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default KnowRecipes;
