import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

const KnowProduct = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        if (!backendUrl) {
          throw new Error("Backend URL is not defined");
        }
        const response = await axios.get(`${backendUrl}/blogs/all`);
        setBlogs(response.data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  if (error) {
    return <p>Error fetching blogs: {error}</p>;
  }

  // Function to extract plain text from HTML and limit to the first few lines after <body> tag
  const sanitizeContent = (htmlContent) => {
    return DOMPurify.sanitize(htmlContent); // Sanitize HTML content to prevent XSS
  };

  const getSnippet = (htmlContent, charLimit = 130) => {
    // Create a temporary container to extract plain text from HTML
    const tempElement = document.createElement("div");
    tempElement.innerHTML = sanitizeContent(htmlContent);
    const plainText = tempElement.textContent || tempElement.innerText || "";
    return plainText.length > charLimit
      ? `${plainText.slice(0, charLimit)}...`
      : plainText;
  };


  return (
    <section className="bg-[#623c49] py-16">
      <div className="container mx-auto px-4 sm:px-8 lg:px-40">
        <h2 className="text-3xl font-extrabold baskervville-regular text-[#bbb1a6] mb-12 text-center">
          YOUR GUIDE TO WELLNESS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog) => (
            <div
              key={blog._id || blog.id}
              className="bg-[#BBB1A6] rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={blog.imgUrl}
                alt={`Blog titled ${blog.title}`}
                className="w-full h-48 object-cover p-4"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>

                {/* Extract plain text after <body> and limit to first few lines */}
                <div className="text-gray-700">
                  {getSnippet(blog.content)}
                </div>
              </div>
              <div className="flex mb-4 items-center justify-center">
                <button
                  className="text-[#3C0C1C] px-4 text-xl font-semibold hover:scale-105 transition"
                  onClick={() => navigate(`/blogs/${blog._id}`)}
                >
                  Read Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowProduct;
