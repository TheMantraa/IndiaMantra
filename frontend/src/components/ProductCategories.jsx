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

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-20 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200"
          >
            {/* Product Image */}
            <div className="relative w-full h-64">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-50 transition duration-300"></div>
            </div>

            {/* Product Info */}
            <div className="p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-medium text-[#383838] mb-1">
                {product.name.slice(0, 25)}
              </h3>
              <p className="text-sm sm:text-base text-[#383838] mb-3">
                ₹ {product.price}
              </p>
              <button
                className="w-full text-xs sm:text-sm font-medium bg-[#623c49] text-white border border-[#383838] rounded-lg py-2 hover:bg-[#3C0C1C] hover:text-white"
                onClick={() => {
                  navigate(`/products/${product._id}`);
                }}
              >
                Explore Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
