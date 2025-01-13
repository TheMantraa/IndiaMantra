import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/getProductById/${id}`)
      .then((response) => {
        setProduct(response.data);
        setMainImage(response.data.images[0]); // Set the first image as the default main image
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

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg font-semibold text-gray-700">
          Product not found.
        </p>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="lg:p-4 space-y-2 font-semibold text-gray-700">
            {product.description}
          </div>
        );
      case "benefits":
        return (
          <div className="p-4 space-y-2">
            {Array.isArray(product.benefits) && product.benefits.length > 0 ? (
              product.benefits.map((benefit, index) => {
                const [title, description] = benefit.split(": ");
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <li className="text-gray-700 font-medium list-disc">
                      <span className="font-bold">{title}:</span> {description}
                    </li>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 italic">No benefits available</p>
            )}
          </div>
        );

      case "howToUse":
        return (
          <div className="p-4 text-gray-700 font-medium">
            {product.brewingInstructions}
          </div>
        );
      case "proTips":
        return (
          <div className="p-4 text-gray-700 font-medium">{product.proTips}</div>
        );
      default:
        return null;
    }
  };

  const toggleFAQ = (index) => {
    // If the clicked FAQ is already open, close it (set it to null)
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleCardClick = (product) => {
    navigate(`/products/${product._id}`);
  };

  const getRandomProducts = (products) => {
    const shuffled = [...products];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 4);
  };

  const randomRelatedProducts = getRandomProducts(relatedProducts);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this product!",
          text: "Hey, take a look at this amazing product!",
          url: window.location.href,
        });
        console.log("Share was successful.");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  const handleBuyNow = (url) => () => {
    window.open(url, "_blank");
  };

  return (
    <div className=" mx-auto px-6 lg:px-12 ">
      <div className="bg-white rounded-xl overflow-hidden">
        {/* Product Header */}
        <div className="flex flex-col lg:flex-row lg:px-10">
          {/* Left: Images */}
          <div className="lg:w-1/2 space-y-2">
            {/* Main Image */}
            <div className="w-full overflow-hidden ">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full max-w-xl mx-auto mt-4 object-contain"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto max-w-full py-3 px-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`border rounded-lg overflow-hidden transition duration-300 ease-in-out transform ${
                    mainImage === image ? "border-blue-600" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover hover:opacity-75 transition-opacity duration-300"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:w-1/2 lg:p-6 space-y-5">
            <div className="flex gap-1 items-center">
              <FaStar className="text-[#623c49]" />
              <FaStar className="text-[#623c49]" />
              <FaStar className="text-[#623c49]" />
              <FaStar className="text-[#623c49]" />
              <FaStarHalfAlt className="text-[#623c49]" />

              <div className="ml-1 bg-gray-300">{product.ratings}/5</div>
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="inline-block size-6 rounded-full ring-2 ring-white"
                />
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="inline-block size-6 rounded-full ring-2 ring-white"
                />
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                  className="inline-block size-6 rounded-full ring-2 ring-white"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight leading-tight">
                  {product.name}
                </h1>
              </div>
              <CiShare2
                className="text-2xl text-gray-600 mr-8 cursor-pointer transition-transform transform hover:scale-110 hover:text-[#623c49] "
                onClick={handleShare}
              />
            </div>

            <div className="flex items-center space-x-2 ">
              <span className="text-lg font-medium text-gray-500 line-through">
                ₹ {product.price}
              </span>
              <span className="text-lg font-semibold text-green-500">
                ₹ {(product.price - product.price * 0.2).toFixed(0)}
              </span>
              <span className="text-md text-white font-bold bg-red-500 px-3 rounded-xl">
                SALE
              </span>
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/dxyuojydi/image/upload/v1735835758/LOGO_2_bbwavl.png"
                alt=""
                className="w-[440px] h-36 mx-auto"
              />
            </div>

            {/* Buy Now Button */}
            <div className=" w-full flex justify-center items-center">
              <button
                className="my-3 py-2 w-full px-4 bg-[#623c49] hover:bg-[#3C0C1C] text-white font-semibold text-lg rounded-lg"
                onClick={handleBuyNow(product.buyUrl)}
              >
                Where To Buy
              </button>
            </div>
            <div>
              <p className="font-extrabold text-2xl pl-1">
                Why Choose {`${product.name}`}?
              </p>
              <div className="space-y-1 pt-1 text-justify">
                {product.features.map((feature, index) => {
                  const [title, description] = feature.split(": ");
                  return (
                    <p
                      key={index}
                      className="text-gray-800 text-xl font-semibold"
                    >
                      <span className="font-bold ">• {title}:</span>{" "}
                      {description}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="lg:px-20 ">
          {/* Tabs for Ingredients, Benefits, How to Use, Pro Tips */}
          <div className="flex justify-start items-center space-x-4 mt-6">
            <div
              className={`w-1/4 text-center cursor-pointer ${
                activeTab === "description"
                  ? "font-bold border-b-2 border-[#765460]"
                  : ""
              }`}
              onClick={() => setActiveTab("description")}
            >
              <p className="lg:text-xl font-semibold text-gray-800">
                Description
              </p>
            </div>
            <div
              className={`w-1/4 text-center cursor-pointer ${
                activeTab === "benefits"
                  ? "font-bold border-b-2 border-[#765460]"
                  : ""
              }`}
              onClick={() => setActiveTab("benefits")}
            >
              <p className="lg:text-xl font-semibold text-gray-800">Benefits</p>
            </div>
            <div
              className={`w-1/4 text-center cursor-pointer ${
                activeTab === "howToUse"
                  ? "font-bold border-b-2 border-[#765460]"
                  : ""
              }`}
              onClick={() => setActiveTab("howToUse")}
            >
              <p className=" lg:text-xl font-semibold text-gray-800 ">
                Brewing
              </p>
            </div>
            <div
              className={`w-1/4 text-center cursor-pointer ${
                activeTab === "proTips"
                  ? "font-bold border-b-2 border-[#765460]"
                  : ""
              }`}
              onClick={() => setActiveTab("proTips")}
            >
              <p className="lg:text-xl font-semibold text-gray-800">Pro Tips</p>
            </div>
          </div>
          <div className="mt-4 rounded-md  lg:p-4 ">{renderTabContent()}</div>

          {/* Product Gallery  */}
          <div className="mt-10">
            <h2 className="text-5xl font-bold text-gray-800 mb-4 text-center">
              PRODUCT GALLERY
            </h2>
            <div className="grid grid-cols-3 gap-1">
              {product.images.map((image, index) => {
                // Determine the layout pattern for each image
                const isLargeImage = index % 3 === 0;
                return (
                  <div
                    key={index}
                    className={`flex justify-center items-center p-2  bg-white ${
                      isLargeImage
                        ? "col-span-2 row-span-2"
                        : "col-span-1 row-span-1"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`product  ${index + 1}`}
                      className="w-full h-full object-contain "
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* You May Also Like */}
          <div className="mt-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
              You May Also Like
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {randomRelatedProducts.slice(0, 4).map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer border border-gray-200 overflow-hidden relative"
                >
                  <div className="relative w-full h-64">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-50 transition duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#623c49] transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex justify-between items-center mt-4">
                      <button
                        className="bg-[#623c49] text-white px-4 py-2 rounded-full hover:bg-[#3C0C1C] transition"
                        onClick={handleBuyNow(product.buyUrl)}
                      >
                        Buy Now
                      </button>
                      <button
                        className="text-[#623c49] hover:text-[#3C0C1C] font-semibold"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(product);
                          window.location.reload();
                        }}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Faq Section */}
          {product.faqs.length > 0 && (
            <div className="mt-8 lg:px-32">
              <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
                Frequently Asked Questions:
              </h1>
              <div className="space-y-2">
                {product.faqs.map((faq, index) => (
                  <div key={index} className="border-t py-2">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left text-lg font-semibold text-gray-800 flex justify-between items-center"
                    >
                      <span>{faq.question}</span>
                      <span
                        className={`transform ${
                          openFAQ === index ? "rotate-180" : ""
                        }`}
                      >
                        ▼ {/* Arrow icon */}
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

          {/* Reviews Section - Cards */}
          {product.reviews.length > 0 && (
            <div className="my-8 sm:px-8 md:px-16 lg:px-32">
              <h1 className="text-4xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8">
                Customer Reviews
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
                {product.reviews.map((review, index) => (
                  <div key={index} className="p-4">
                    <div className="h-full bg-[#BBB1A6] shadow-md rounded-lg p-6 text-center">
                      <img
                        alt={review.name}
                        className="w-20 h-20 mb-4 object-cover object-center rounded-full inline-block border-2 border-gray-300"
                        src={review.profileImage}
                      />
                      <div className="flex justify-center mb-2">
                        {Array(5)
                          .fill()
                          .map((_, starIndex) => (
                            <FaStar
                              key={starIndex}
                              className={
                                starIndex < review.rating
                                  ? "text-[#623c49]"
                                  : "text-slate-200"
                              }
                            />
                          ))}
                      </div>
                      <p className="leading-relaxed text-[#3C0C1C] font-semibold text-md italic">
                        "{review.description}"
                      </p>
                      <span className="inline-block h-1 w-10 rounded bg-[#3C0C1C] mt-4 mb-4"></span>
                      <h2 className="text-black font-semibold text-lg">
                        {review.name.toUpperCase()}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
