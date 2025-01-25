import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const RecipeDetail = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeTab, setActiveTab] = useState("ingredients");
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState("");

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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/getProductById/${id}`)
      .then((response) => {
        setProduct(response.data);
        setMainImage(response.data.images[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/getAllProduct`)
      .then((response) => {
        setRelatedProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  const renderContent = () => {
    if (activeTab === "ingredients") {
      return (
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-base sm:text-lg">{ingredient}</li>
          ))}
        </ul>
      );
    } else if (activeTab === "steps") {
      return (
        <ol className="list-decimal list-inside text-gray-600 space-y-2">
          {recipe.steps.map((step, index) => (
            <li key={index} className="text-base sm:text-lg">{step}</li>
          ))}
        </ol>
      );
    } else if (activeTab === "benefits") {
      return (
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {recipe.benefits.map((benefit, index) => (
            <li key={index} className="text-base sm:text-lg">{benefit}</li>
          ))}
        </ul>
      );
    }
  };

  const getRandomProducts = (products) => {
    const shuffled = [...products];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 3);
  };

  const randomRelatedProducts = getRandomProducts(relatedProducts);

  const handleBuyNow = (url) => () => {
    window.open(url, "_blank");
  };

  const handleCardClick = (product) => {
    navigate(`/products/${product._id}`);
  };

  async function downloadRecipeAsPDF(recipe) {
    const doc = new jsPDF();
    doc.setFont("times");
    doc.setTextColor("#3C0C1C");

    let currentY = 20;
    const margin = 14;
    const maxWidth = 180; // Max width for text and image

    // Helper function to check if content fits on the page
    const checkPageOverflow = (lineHeight = 10) => {
      return currentY + lineHeight > 270; // 270 is near the bottom of the page
    };

    // Title
    doc.setFontSize(18);
    doc.text(recipe.title, margin, currentY);
    currentY += 10;

    // Introduction (with line wrapping if necessary)
    doc.setFontSize(12);
    const introductionLines = doc.splitTextToSize(recipe.introduction, maxWidth);
    introductionLines.forEach(line => {
      if (checkPageOverflow()) {
        doc.addPage(); // Add a new page when overflow occurs
        currentY = 20;
      }
      doc.text(line, margin, currentY);
      currentY += 5;
    });

    // Image (if exists)
    if (recipe.imageUrl) {
      try {
        const response = await axios.get(recipe.imageUrl, { responseType: "arraybuffer" });
        const imageData = `data:image/jpeg;base64,${btoa(
          new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
        )}`;
        const imageWidth = maxWidth;
        const imageHeight = 150;

        // Check if the image will fit on the current page
        if (checkPageOverflow(imageHeight + 10)) {
          doc.addPage(); // Add a new page when overflow occurs
          currentY = 20;
        }

        doc.addImage(imageData, "JPEG", margin, currentY, imageWidth, imageHeight);
        currentY += imageHeight + 10;
      } catch (error) {
        console.error("Failed to load image", error);
      }
    }

    // Ingredients
    doc.setFontSize(14);
    doc.text("Ingredients:", margin, currentY);
    currentY += 10;
    recipe.ingredients.forEach((ingredient, index) => {
      // Check for overflow before adding each ingredient
      if (checkPageOverflow()) {
        doc.addPage(); // Add a new page when overflow occurs
        currentY = 20; // Reset the vertical position to top of new page
      }
      doc.text(`- ${ingredient}`, margin, currentY);
      currentY += 10;
    });

    // Add extra space between Ingredients and Steps
    currentY += 5; // Adjust this value to increase or decrease the space

    // Steps
    doc.setFontSize(14);
    doc.text("Steps to Brew:", margin, currentY);
    currentY += 10;
    recipe.steps.forEach((step, index) => {
      // Check for overflow before adding each step
      if (checkPageOverflow()) {
        doc.addPage(); // Add a new page when overflow occurs
        currentY = 20; // Reset the vertical position to top of new page
      }
      doc.text(`${index + 1}. ${step}`, margin, currentY);
      currentY += 10;
    });

    // Add extra space between Steps and Benefits
    currentY += 15; // Adjust this value to increase or decrease the space

    // Benefits
    doc.setFontSize(14);
    doc.text("Benefits:", margin, currentY);
    currentY += 10;
    recipe.benefits.forEach((benefit, index) => {
      // Check for overflow before adding each benefit
      if (checkPageOverflow()) {
        doc.addPage(); // Add a new page when overflow occurs
        currentY = 20; // Reset the vertical position to top of new page
      }
      doc.text(`- ${benefit}`, margin, currentY);
      currentY += 10;
    });

    // Save the PDF
    doc.save(`${recipe.title}-recipe.pdf`);
  }


  return (
    recipe && (
      <div className="flex justify-center mt-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg overflow-hidden">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-72 object-cover sm:h-96"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center sm:text-4xl">
              {recipe.title}
            </h1>
            <p className="text-gray-600 text-center font-semibold text-base sm:text-lg mb-6">
              {recipe.introduction}
            </p>
            <div>
              <div className="flex justify-center space-x-3 mb-5 sm:space-x-4 sm:mb-6">
                <button
                  onClick={() => setActiveTab("ingredients")}
                  className={`px-3 py-1.5 text-base sm:px-4 sm:py-2 sm:text-lg font-semibold rounded-full ${activeTab === "ingredients"
                    ? "bg-[#3C0C1C] text-white"
                    : "bg-[#9b5f74] text-white"
                    }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab("steps")}
                  className={`px-3 py-1.5 text-base sm:px-4 sm:py-2 sm:text-lg font-semibold rounded-full ${activeTab === "steps"
                    ? "bg-[#3C0C1C] text-white"
                    : "bg-[#9b5f74] text-white"
                    }`}
                >
                  Steps to Brew
                </button>
                <button
                  onClick={() => setActiveTab("benefits")}
                  className={`px-3 py-1.5 text-base sm:px-4 sm:py-2 sm:text-lg font-semibold rounded-full ${activeTab === "benefits"
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

            {/* Download Recipe Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => downloadRecipeAsPDF(recipe)}
                className="bg-[#623c49] text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-[#3C0C1C] transition"
              >
                Download Recipe
              </button>
            </div>

            {recipe.faqs.length > 0 && (
              <div className="mt-8 px-4 lg:px-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                {recipe.faqs.map((faq, index) => (
                  <div key={index} className="bg-white shadow-sm rounded-md mb-4">
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer"
                      onClick={() => toggleFAQ(index)}
                    >
                      <h3 className="font-semibold text-lg">{faq.question}</h3>
                      <span className="text-xl">{openFAQ === index ? "-" : "+"}</span>
                    </div>
                    {openFAQ === index && (
                      <div className="bg-gray-50 p-4">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default RecipeDetail;
