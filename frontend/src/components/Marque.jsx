import React from "react";

const Marque = () => {
  return (
    <div className="relative flex overflow-x-hidden text-black bg-[#bbb1a6] ">
      <div className="py-1 animate-marquee whitespace-nowrap">
        <span className=" font-medium mx-20">Launching Soon in the INDIA!</span>
        <span className=" font-medium mx-20">
          Discover your balance with Mantra
        </span>
        <span className=" font-medium mx-20">
          Crafted with pure and natural ingredients.
        </span>
      </div>

      <div className="absolute top-0 py-1 animate-marquee2 whitespace-nowrap">
        <span className=" font-medium mx-20">Launching Soon in the INDIA!</span>
        <span className=" font-medium mx-20">
          Discover your balance with Mantra
        </span>
        <span className=" font-medium mx-20">
          Crafted with pure and natural ingredients.
        </span>
      </div>
    </div>
  );
};

export default Marque;
