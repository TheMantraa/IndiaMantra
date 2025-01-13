import React from "react";
import { Link } from "react-router-dom";

const Videointro = () => {
  return (
    <div className="relative">
      <video
        className="w-full h-[52vh] sm:h-screen  object-cover"
        src="Main page.mp4"
        loop
        muted
        autoPlay
        playsInline
      ></video>

      {/* Banner Content */}
      <div className="absolute inset-0 flex justify-center items-center text-center">
        <div className="bg-black bg-opacity-50 text-white px-6 py-8 sm:px-12 sm:py-10 lg:px-80 lg:py-16 rounded-lg">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 baskervville-regular">
            The Mantra
          </h2>
          <div className="text-base sm:text-lg lg:text-xl mb-6 baskervville-regular">
            Elixir of Wellness
          </div>
          <Link
            to="/products"
            className="bg-[#3C0C1C] text-white py-2 px-4 sm:py-3 sm:px-6 lg:py-4 lg:px-8 rounded-lg hover:bg-[#765460] transition font-semibold baskervville-regular"
          >
            Browse Store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Videointro;
