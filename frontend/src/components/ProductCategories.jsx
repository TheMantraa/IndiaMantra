import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductCategories = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/products/getProductByCategory/${category}`
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const handleCardClick = (product) => {
    navigate(`/products/${product._id}`);
  };

  const handlebuy = (url) => {
    window.open(url, "_blank");
  };
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-20 py-6">
      <h1 className=" mt-4 text-4xl font-extrabold text-center mb-4 text-[#3C0C1C] tracking-wide baskervville-regular">
        DISCOVER THE WORLD OF TEA
      </h1>
      <p className=" lg:mx-20 text-center font-semibold text-xl text-[#3C0C1C] mb-8 baskervville-regular">
        Explore our premium collection of teas, crafted with nature’s finest
        ingredients for your wellness and indulgence. Find your perfect brew and
        savor the harmony of tradition in every sip!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="group bg-[#f6f5f4] rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer border border-gray-200 overflow-hidden relative"
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
              <p className="text-gray-600 text-sm mb-2">
                <strong>Category:</strong> {product.category}
              </p>
              <p className="text-gray-700 text-base mb-4 text-justify ">
                {product.description.slice(0, 105)}...
              </p>
              <div className="flex justify-between items-center mt-4">
                <button
                  className="bg-[#623c49] text-white px-4 py-2 rounded-full hover:bg-[#3C0C1C] transition"
                  onClick={(e) => {
                    handlebuy(product.buyUrl);
                  }}
                >
                  Buy Now
                </button>
                <button
                  className="text-[#623c49] hover:text-[#3C0C1C] font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(product);
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
  );
};

export default ProductCategories;
