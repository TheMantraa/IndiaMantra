import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const EmailModal = ({ onSubmit, onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
  <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-lg w-full">
    <button
      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
      onClick={onClose}
    >
      <FaTimes className="h-6 w-6" />
    </button>
    <h2 className="text-3xl font-extrabold mb-4 text-center text-[#3C0C1C]">
      Welcome to MANTRA
    </h2>
    <p className="text-center text-xl text-gray-700 italic mb-4">
      "Sip into Wellness!"
    </p>
    <p className="text-gray-600 text-center mb-6">
      Join our herbal tea community for exclusive deals, wellness tips, recipes, and more. 
      Enjoy invites to tea tastings and wellness sessions!
    </p>
    <p className="mb-6 font-bold text-lg text-center text-[#3C0C1C]">
      Get an exclusive 5% discount code directly in your email!
    </p>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        placeholder="Enter your email"
      />
      <button
        type="submit"
        className="w-full bg-[#623c49] text-white py-2 px-4 rounded-lg hover:bg-[#3C0C1C] transition focus:outline-none"
      >
        Submit
      </button>
    </form>
    <p className="text-center text-sm text-gray-500 mt-4">
      No spam—just the good stuff for your wellness!
    </p>
  </div>
</div>

  );
};

export default EmailModal;
