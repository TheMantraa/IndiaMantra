import React from "react";
import { Link } from "react-router-dom"; // Import Link
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaClock,
  FaHome,
  FaPinterest,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#3C0C1C] text-slate-300 py-8 baskervville-regular  ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          {/* About Us Section */}
          <div>
            <h3 className="text-[#ddd8d2]  text-2xl font-semibold ">About Us</h3>
            <ul className="mt-4 text-md space-y-2">
              {/* <li>
                <Link
                  to="/our-story-vision"
                  className="hover:text-[#D5B36B] transition-colors"
                >
                  About The Mantra
                </Link>
              </li> */}
              <li>
                <Link
                  to="/our-story-vision"
                  className="text-[#ddd8d2] hover:text-[#bbb1a6] transition-colors"
                >
                  Our Mission & Values
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-[#ddd8d2] hover:text-[#bbb1a6] transition-colors"
                >
                  Blogs
                </Link>
              </li>

              <li>
                <Link
                  to="/contactus"
                  className="text-[#ddd8d2] hover:text-[#bbb1a6] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-[#ddd8d2] text-2xl font-semibold">Quick Links</h3>
            <ul className="mt-4 text-md space-y-2">
              <li>
                <Link to="/" className="text-[#ddd8d2] hover:text-[#bbb1a6] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-[#ddd8d2] hover:text-[#bbb1a6] transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes"
                  className="text-[#ddd8d2] hover:text-[#bbb1a6] transition-colors"
                >
                  Recipe
                </Link>
              </li>
              {/* <li>
                <Link to="/" className="hover:text-[#D5B36B] transition-colors">
                  Testimonials
                </Link>
              </li> */}

            </ul>
          </div>

          {/* Get in Touch Section */}
          <div>
            <h3 className="text-[#ddd8d2] text-2xl font-semibold">Get in Touch</h3>
            <ul className="mt-4 space-y-2 text-md">
              <li className="text-[#ddd8d2] hover:text-[#bbb1a6] transition-colors">
                <FaHome className="text-[#ddd8d2] inline-block" /> India & Canada
              </li>
              <li className="text-[#ddd8d2] hover:text-[#bbb1a6] transition-colors">
                <MdEmail className="text-[#ddd8d2] inline-block" /> info@themantra.ca
              </li>
              <li className="text-[#ddd8d2] hover:text-[#bbb1a6] transition-colors">
                <FaClock className="text-[#ddd8d2] inline-block" /> Mon-Fri: 9:00 AM – 6:00 PM
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-[#ddd8d2] text-2xl font-semibold">Follow Us</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex justify-center sm:justify-start gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61567152969589&mibextid=ZbWKwL"
                  className="text-[#ddd8d2] hover:text-[#bbb1a6] text-2xl transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebook size={30} />
                </a>
                <a
                  href="https://www.instagram.com/the._mantra?igsh=bmY1bW83aHFoeXVk"
                  className="text-[#ddd8d2] hover:text-[#bbb1a6] text-2xl transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram size={30} />
                </a>
                <a
                  href="https://in.pinterest.com/the_mantraa/?invite_code=3b5301c746844a47a6af9002ed5472a2&sender=1145532992626882410"
                  className="text-[#ddd8d2] hover:text-[#bbb1a6] text-2xl transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaPinterest size={30} />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  className="text-[#ddd8d2] hover:text-[#bbb1a6] text-2xl transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin size={30} />
                </a>

                <a
                  href="https://www.youtube.com/"
                  className="text-[#ddd8d2] hover:text-[#bbb1a6] text-2xl transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaYoutube size={30} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-[#ddd8d2] border-t border-gray-700 mt-8 pt-4 text-sm text-center">
          <p>
            Copyright © 2025, Sara Consultancy ·{" "}
            <Link to="/privacy" className="bold hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
