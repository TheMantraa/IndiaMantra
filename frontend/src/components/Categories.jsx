import React from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Categories Section */}
      <div className="bg-[#623c49] py-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-6 baskervville-regular text-[#D5B36B]">
            CHOOSE YOUR TEA
          </h1>
        </div>

        <div className="mx-auto px-4 sm:px-8 lg:px-40">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Category 1 */}
            <div className="bg-[#623c49] flex items-center justify-center overflow-hidden">
              <div className="w-72 h-72 overflow-hidden rounded-full relative">
                <img
                  src="https://res.cloudinary.com/dxyuojydi/image/upload/v1736171235/WhatsApp_Image_2025-01-06_at_19.06.03_1_qljc9t.jpg"
                  alt="Green Tea"
                  className="w-full h-full object-cover rounded-full border-2 p-2 border-[#D5B36B]"
                />
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
                  onClick={() => navigate("/productscategory/GreenTea")}
                >
                  <h2 className="text-lg font-bold text-white cursor-pointer hover:font-extrabold">
                    Green Tea →
                  </h2>
                </div>
              </div>
            </div>

            {/* Category 2 */}
            <div className="bg-[#623c49] flex items-center justify-center overflow-hidden">
              <div className="w-72 h-72 overflow-hidden rounded-full relative">
                <img
                  src="https://res.cloudinary.com/dxyuojydi/image/upload/v1736171235/WhatsApp_Image_2025-01-06_at_19.06.03_xzjiue.jpg"
                  alt="Black Tea"
                  className="w-full h-full object-cover rounded-full border-2 p-2 border-[#D5B36B]"
                />
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
                  onClick={() => navigate("/productscategory/BlackTea")}
                >
                  <h2 className="text-lg font-semibold text-white cursor-pointer hover:font-extrabold">
                    Black Tea →
                  </h2>
                </div>
              </div>
            </div>

            {/* Category 3 */}
            <div className="bg-[#623c49]  flex items-center justify-center overflow-hidden">
              <div className="w-72 h-72 overflow-hidden rounded-full relative">
                <img
                  src="https://res.cloudinary.com/dxyuojydi/image/upload/v1736171235/WhatsApp_Image_2025-01-06_at_19.06.05_ugxtqf.jpg"
                  alt="Herbal Tea"
                  className="w-full h-full object-cover rounded-full border-2 p-2 border-[#D5B36B]"
                />
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
                  onClick={() => navigate("/productscategory/HerbalTea")}
                >
                  <h2 className="text-lg font-semibold text-white cursor-pointer hover:font-extrabold">
                    Herbal Tea →
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Button Section */}
        <div className="text-center mt-10">
          <button
            className="bg-[#ecb640] text-white font-bold py-2 px-6 rounded-lg text-xl hover:bg-[#b59c36] transition duration-300 shadow-lg"
            onClick={() => navigate("/products")}
          >
            View Our Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
