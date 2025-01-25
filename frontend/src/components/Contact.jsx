import React, { useState } from "react";
import axios from "axios";
import BannerImage from "./BannerImage";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    setStatus(""); // Clear any previous status message
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendemail/contactus`,
        formData
      );
      setStatus(response.data.message);
      alert(response.data.message);
      setFormData({ name: "", email: "", phone: "", comment: "" }); // Clear the form
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("Error sending email");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <>
      <BannerImage />
      <div className="h-auto flex items-center justify-center bg-[#eeebe9]">
        <form className="bg-[#eeebe9] p-6 w-full max-w-3xl" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold mb-6 mt-4 text-[#3C0C1C] baskervville-regular">
            We would Love To Hear From You!
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-4 bg-[#eeebe9]">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={formData.name}
                onChange={handleChange}
                className="bg-[#eeebe9] w-full px-4 py-3 border border-[#2B2C2D] rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#2B2C2D]"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                className=" bg-[#eeebe9] w-full px-4 py-3 border border-[#2B2C2D] rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#2B2C2D]"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="phone"
              placeholder="Phone number *"
              value={formData.phone}
              onChange={handleChange}
              className="bg-[#eeebe9] w-full px-4 py-3 border border-[#2B2C2D] rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#2B2C2D]"
              required
            />
          </div>

          <div className="mb-6">
            <textarea
              name="comment"
              placeholder="Comment *"
              rows="4"
              value={formData.comment}
              onChange={handleChange}
              required
              className="bg-[#eeebe9] w-full px-4 py-3 border border-[#2B2C2D] rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#2B2C2D]"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className=" w-32  bg-[#623c49] text-white font-bold px-4 py-2 rounded-xl hover:bg-[#3C0C1C] transition duration-200 ease-in-out"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Sending..." : "Send"} {/* Button shows loader text */}
            </button>
          </div>

          {status && <p className="mt-4 text-center">{status}</p>}
        </form>
      </div>
    </>
  );
};

export default Contact;
