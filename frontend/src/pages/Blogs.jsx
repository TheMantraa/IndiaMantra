import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

const Blogs = () => {
  const [newsItems, setNewsItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/blogs/all`)
      .then((response) => {
        const sortedBlogs = response.data
          .slice() // Create a copy before sorting
          .filter((item) => item.date) // Ensure the date exists
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setNewsItems(sortedBlogs);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);



  const handleBlogClick = (id) => {
    navigate(`/blogs/${id}`); // Navigate to the blog details page
  };

  const sanitizeContent = (htmlContent) => {
    return DOMPurify.sanitize(htmlContent); // Sanitize HTML content to prevent XSS
  };

  const getSnippet = (htmlContent, charLimit = 100) => {
    // Create a temporary container to extract plain text from HTML
    const tempElement = document.createElement("div");
    tempElement.innerHTML = sanitizeContent(htmlContent);
    const plainText = tempElement.textContent || tempElement.innerText || "";
    return plainText.length > charLimit
      ? `${plainText.slice(0, charLimit)}...`
      : plainText;
  };

  return (
    <div className="py-8 px-4 bg-[#eeebe9]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-[#3C0C1C] sm:text-left baskervville-regular">
          BLOGS
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
          {newsItems.map((item) => (
            <div
              key={item._id}
              className="group overflow-hidden transition duration-700"
              onClick={() => handleBlogClick(item._id)}
            >
              <div className="overflow-hidden">
                <img
                  src={item.imgUrl}
                  alt={item.title}
                  className="w-full h-44 sm:h-56 object-cover rounded-md group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="my-4">
                <h2 className="sm:text-2xl lg:text-2xl font-semibold text-gray-800 group-hover:underline cursor-pointer">
                  {item.title}
                </h2>
                <p className="text-md sm:text-md text-gray-600 mt-3">
                  {getSnippet(item.content)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
