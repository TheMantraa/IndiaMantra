import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Bestsellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/products/getAllProduct`
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getRandomProducts = (products) => {
    const shuffled = [...products];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 4);
  };

  const randomProducts = getRandomProducts(products);

  return (
    <div className="bg-[#eeebe9] px-4 sm:px-8 lg:px-40 py-12">
      {/* Section Title */}
      <h2 className="text-4xl font-extrabold text-[#3C0C1C] mb-6 text-center baskervville-regular">
        BEST-SELLERS
      </h2>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center">Error: {error.message}</p>}
        {randomProducts.map((product) => (
          <div
            key={product._id}
            className="bg-[#f6f5f4] rounded-lg overflow-hidden border border-gray-200"
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
            <div className="p-4">
              <h3 className="text-lg font-medium text-[#383838] mb-1">
                {product.name.slice(0, 25)}
              </h3>
              <p className="text-sm text-[#383838] mb-4">Rs {product.price}</p>
              <button
                className="w-full bg-[#3C0C1C] text-sm font-medium  text-white  border border-[#383838] rounded-lg py-2 hover:bg-[#623c49] hover:text-white"
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

      {/* View All Button */}
      <div className="mt-8 text-center">
        <button
          className="text-sm font-medium text-white bg-[#3C0C1C]  rounded-lg py-2 px-6 hover:hover:bg-[#623c49]"
          onClick={() => {
            navigate("/products");
          }}
        >
          View all
        </button>
      </div>
    </div>
  );
};

export default Bestsellers;
