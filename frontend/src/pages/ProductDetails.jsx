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
    <div className=" mx-auto px-6 lg:px-12 bg-[#eeebe9] ">
      <div className="bg-[#eeebe9] rounded-xl overflow-hidden">
        {/* Product Header */}
        <div className="flex flex-col lg:flex-row lg:px-10">
          {/* Left: Images */}
          <div className="lg:w-1/2 space-y-2">
            {/* Main Image */}
            <div className="w-full overflow-hidden">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full max-w-xl mx-auto mt-4 object-contain"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2  px-4 py-3 lg:justify-start overflow-x-auto no-scrollbar">
              {product.images.length > 1 ? (
                product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(image)}
                    className={`shrink-0 border rounded-lg transition duration-300 ease-in-out ${mainImage === image
                      ? "border-blue-600"
                      : "border-gray-200"
                      }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-16 h-16 object-cover lg:w-20 lg:h-20 hover:opacity-75"
                    />
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-sm">
                  No additional images available.
                </p>
              )}
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

              {/* <div className="ml-1 bg-gray-300 text-sm px-2 rounded">
                {product.ratings}/5
              </div> */}
            </div>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                {product.name}
              </h1>
              <CiShare2
                className="text-xl lg:text-2xl text-gray-600 cursor-pointer transition-transform hover:scale-110 hover:text-[#623c49]"
                onClick={handleShare}
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm lg:text-xl font-medium text-gray-500">
                ${product.price}
              </span>
              {/* <span className="text-sm lg:text-xl font-semibold text-gray-800">
                ${(product.price - product.price * 0.2).toFixed(0)}

              </span> */}

            </div>


            {/* Buy Now Button */}


            <div className="space-y-4">
              <p className="font-semibold text-sm lg:text-xl space-y-8">
                Why Choose {`${product.name}`}?
              </p>
              <div className="space-y-4 pt-1 text-justify">
                {product.features.map((feature, index) => {
                  const [title, description] = feature.split(": ");
                  return (
                    <p
                      key={index}
                      className="text-gray-800 text-sm text-lg"
                    >
                      <span className="font-semibold">• {title}:</span>{" "}
                      {description}
                    </p>
                  );
                })}
              </div>
            </div>
            <div >
              <img
                src="https://res.cloudinary.com/dxyuojydi/image/upload/v1735835758/LOGO_2_bbwavl.png"
                alt="Product Logo"
                className="w-[200px] h-auto mx-auto object-cover lg:w-[320px] lg:h-auto"

              />
            </div>
            <div className="w-full flex justify-center items-center">
              <button
                className="my-3 py-2 px-4 w-full  bg-[#623c49] hover:bg-[#3C0C1C] text-[#eeebe9] font-semibold text-sm lg:text-lg rounded-lg"
                onClick={handleBuyNow(product.buyUrl)}
              >
                Buy Now
              </button>
            </div>

          </div>

        </div>{" "}

        <div className="lg:px-20">
          {/* Tabs for Ingredients, Benefits, How to Use, Pro Tips */}
          <div className="flex justify-start items-center space-x-4 mt-6">
            <div
              className={`w-1/4 text-center cursor-pointer ${activeTab === "description"
                ? "font-bold border-b-2 border-[#765460]"
                : ""
                }`}
              onClick={() => setActiveTab("description")}
            >
              <p className="lg:text-lg font-semibold text-gray-800">
                Description
              </p>
            </div>
            <div
              className={`w-1/4 text-center cursor-pointer ${activeTab === "benefits"
                ? "font-bold border-b-2 border-[#765460]"
                : ""
                }`}
              onClick={() => setActiveTab("benefits")}
            >
              <p className="lg:text-lg font-semibold text-gray-800">Benefits</p>
            </div>
            <div
              className={`w-1/4 text-center cursor-pointer ${activeTab === "howToUse"
                ? "font-bold border-b-2 border-[#765460]"
                : ""
                }`}
              onClick={() => setActiveTab("howToUse")}
            >
              <p className=" lg:text-lg font-semibold text-gray-800 ">
                Brewing
              </p>
            </div>
            <div
              className={`w-1/4 text-center cursor-pointer ${activeTab === "proTips"
                ? "font-bold border-b-2 border-[#765460]"
                : ""
                }`}
              onClick={() => setActiveTab("proTips")}
            >
              <p className="lg:text-lg font-semibold text-gray-800">Pro Tips</p>
            </div>
          </div>
          <div className="mt-2 rounded-md  lg:text-base">{renderTabContent()}</div>

          {/* Product Gallery  */}
          <div className="mt-10">
            {/* <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              PRODUCT GALLERY
            </h2> */}

            {/* Mobile View */}
            <div className="block lg:hidden">
              <div className="grid grid-cols-1 gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center p-2 bg-[#eeebe9]"
                  >
                    <img
                      src={image}
                      alt={`product ${index + 1}`}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-3 gap-1">
                {product.images.map((image, index) => {
                  const isLargeImage = index % 8 === 0; // Original large image logic
                  return (
                    <div
                      key={index}
                      className={`flex justify-center items-center p-2 bg-[#eeebe9] ${isLargeImage
                        ? "col-span-2 row-span-2"
                        : "col-span-1 row-span-1"
                        }`}
                    >
                      <img
                        src={image}
                        alt={`product ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  );
                })}
              </div>
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
                  className="group bg-[#eeebe9] rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer border border-gray-200 overflow-hidden relative"
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
                        className={`transform ${openFAQ === index ? "rotate-180" : ""
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
            <div className="px-5 py-16 lg:mx-32">
              <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-12 baskervville-regular">
                MANTRA MOMENTS : YOUR EXPERIENCES
              </h1>
              <div className="flex flex-wrap -m-4 justify-center">
                {/* Testimonial 1 */}
                <div className="lg:w-1/3 md:w-1/2 sm:w-full p-4">
                  <div className="h-full bg-[#BBB1A6] shadow-md rounded-lg p-6 text-center">
                    <img
                      alt="testimonial"
                      className="w-20 h-20 mb-4 object-cover object-center rounded-full inline-block border-2 border-gray-300"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGL6QeARVpiAQDOkK3RA3bgEXV-a06j2FplA&s"
                    />
                    <div className="flex justify-center mb-2">
                      <FaStar className="text-[#623c49]" />
                      <FaStar className="text-[#623c49]" />
                      <FaStar className="text-[#623c49]" />
                      <FaStar className="text-[#623c49]" />
                      <FaStar className="text-slate-200" />
                    </div>
                    <p className="leading-relaxed text-[#3C0C1C] font-semibold text-md italic">
                      "Mantra Herbal Tea is now part of my daily routine. It's
                      soothing, refreshing, and perfect for unwinding after a busy
                      day."
                    </p>
                    <span className="inline-block h-1 w-10 rounded bg-[#3C0C1C] mt-4 mb-4"></span>
                    <h2 className="text-black font-semibold text-lg">
                      Sophia Bennett
                    </h2>
                  </div>
                </div>
                {/* Testimonial 2 */}
                <div className="lg:w-1/3 md:w-1/2 sm:w-full p-4">
                  <div className="h-full bg-[#BBB1A6] shadow-md rounded-lg p-6 text-center">
                    <img
                      alt="testimonial"
                      className="w-20 h-20 mb-4 object-cover object-center rounded-full inline-block border-2 border-gray-300"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU53EcOIyxE7pOZJBvGHJGbDk39EYxvOhbdw&s"
                    />
                    <div className="flex justify-center mb-2">
                      <FaStar className="text-[#623c49]" />
                      <FaStar className="text-[#623c49]" />
                      <FaStar className="text-[#623c49]" />
                      <FaStar className="text-[#623c49]" />
                      <FaStar className="text-[#623c49]" />
                    </div>
                    <p className="leading-relaxed text-[#3C0C1C] font-semibold text-md italic">
                      "The taste and quality are outstanding. Mantra has shown me what
                      real herbal tea should be like!"
                    </p>
                    <span className="inline-block h-1 w-10 rounded bg-[#3C0C1C] mt-4 mb-4"></span>
                    <h2 className="text-black font-semibold text-lg">
                      James Peterson
                    </h2>
                  </div>
                </div>
                {/* Testimonial 3 */}
                <div className="lg:w-1/3 md:w-1/2 sm:w-full p-4">
                  <div className="h-full bg-[#BBB1A6] shadow-md rounded-lg p-6 text-center">
                    <img
                      alt="testimonial"
                      className="w-20 h-20 mb-4 object-cover object-center rounded-full inline-block border-2 border-gray-300"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmQoGkzpdV8STUOwoWdKv4rz2mMp_C75G_RQ&s"
                    />
                    <div className="flex justify-center mb-2">
                      <FaStar className="text-[#623c49]" />
                      <FaStar className="text-[#623c49]" />
                      <FaStar className="text-[#623c49]" />
                      <FaStar className="text-[#623c49]" />
                      <FaStar className="text-slate-200" />
                    </div>
                    <p className="leading-relaxed text-[#3C0C1C] font-semibold text-md italic">
                      "Mantra tea combines the goodness of Indian herbs in a way that
                      feels Tasty and refreshing. It’s my go-to for a calm and
                      relaxing moment."
                    </p>
                    <span className="inline-block h-1 w-10 rounded bg-[#3C0C1C] mt-4 mb-4"></span>
                    <h2 className="text-black font-semibold text-lg">
                      Olivia Brooks
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
