import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KnowProduct = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/blogs/all`
        );
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
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
  return (
    <section className="bg-[#623c49] py-16">
      <div className="container mx-auto px-4 sm:px-8 lg:px-40">
        {/* Section Title */}
        <h2 className="text-3xl font-extrabold baskervville-regular text-white mb-12 text-center">
          YOUR GUIDE TO WELLNESS
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog) => (
            <div
              key={blog._id}
              className="bg-[#BBB1A6] rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={blog.imgUrl}
                alt="Blog"
                className="w-full h-48 object-cover p-4"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {blog.title.slice(0, 100)}..
                </h2>
              </div>
              <div className="flex mb-4 items-center justify-center">
                <button
                  className=" text-[#3C0C1C] px-4 text-xl font-semibold hover:scale-105 transition"
                  onClick={() => {
                    navigate(`/blogs/${blog._id}`);
                  }}
                >
                  Read Now→
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
