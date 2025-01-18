import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams(); // Extract the blog ID from the URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blog details:", error);
      });
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  // const splitContent = (content) => {
  //   if (!content) return [];
  //   return content
  //     .split(/\n\s*\n/)
  //     .filter((paragraph) => paragraph.trim() !== "");
  // };

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className=" py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 sm:p-8 ">
        {/* Blog Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          {blog.title}
        </h1>

        {/* Author and Date */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 text-sm mb-6">
          <p>
            <span className="font-medium">By:</span> {blog.author || "Unknown"}
          </p>
          <p>
            <span className="font-medium">Published:</span>{" "}
            {formatDate(blog.date)}
          </p>
        </div>

        {/* Blog Image */}
        <div className="mb-6">
          <img
            src={blog.imgUrl}
            alt={blog.title}
            className="w-full h-full sm:h-96 object-cover "
          />
        </div>

        {/* Blog Content */}
        <div
          className="text-gray-700 text-lg leading-relaxed space-y-6 text-justify"
          dangerouslySetInnerHTML={{ __html: blog.content }} // Renders HTML content
        ></div>
      </div>
    </div>
  );
};

export default BlogDetails;
