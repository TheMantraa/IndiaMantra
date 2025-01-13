import React from "react";
import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";

const SocialIcons = () => {
  return (
    <div className="bg-[#3C0C1C] p-4 rounded-l-md fixed top-1/2 right-0 transform -translate-y-1/2">
      <a
        href="https://www.facebook.com/profile.php?id=61567152969589&mibextid=ZbWKwL"
        target="_blank"
        rel="noopener noreferrer"
        className="block mb-2"
      >
        <FaFacebook size={30} className="text-white  hover:text-[#ecb640]" />
      </a>
      <a
        href="https://www.instagram.com/the._mantra?igsh=bmY1bW83aHFoeXVk"
        target="_blank"
        rel="noopener noreferrer"
        className="block mb-2"
      >
        <FaInstagram size={30} className="text-white  hover:text-[#ecb640]" />
      </a>
      <a
        href="https://in.pinterest.com/the_mantraa/?invite_code=3b5301c746844a47a6af9002ed5472a2&sender=1145532992626882410"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <FaPinterest size={30} className="text-white  hover:text-[#ecb640]" />
      </a>
    </div>
  );
};

export default SocialIcons;
