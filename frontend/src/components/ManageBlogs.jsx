import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AddBlogModal from "./AddBlogModal";
import UpdateBlogModal from "./UpdateBlogModal";
import DOMPurify from "dompurify";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/blogs/all`)
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (blogId) => {
    const blogToEdit = blogs.find((blog) => blog._id === blogId);
    setCurrentBlog(blogToEdit);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Blog?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/blogs/delete/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setBlogs(blogs.filter((blog) => blog._id !== blogId));
      alert("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Error deleting blog");
    }
  };

  const handleAddBlog = async (newBlog) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/blogs/add`,
        newBlog,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setBlogs([...blogs, response.data]);
      setIsModalOpen(false);
      alert("Blog added successfully!");
    } catch (error) {
      console.error(error);
      setError(error);
      alert("Error adding blog");
    }
  };

  const handleUpdateBlog = (updatedBlog) => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/blogs/update/${updatedBlog._id}`,
        updatedBlog,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        setBlogs(
          blogs.map((blog) =>
            blog._id === updatedBlog._id ? response.data : blog
          )
        );
        setIsUpdateModalOpen(false);
        alert("Blog updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
        alert("Error updating blog");
      });
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-600">
          Error loading blogs. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-blue-600 text-[#bbb1a6] px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="mr-2" /> Add Blog
        </button>
      </div>

      {/* Render Blogs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id || blog.title}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={blog.imgUrl || "/path/to/default-image.jpg"}
              alt="Blog"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-md sm:text-md text-gray-600 mt-3">
                {getSnippet(blog.content)}
              </p>

              <div className="flex justify-between items-center text-gray-500 text-sm mb-4">
                <p>By: {blog.author}</p>
                <p>{new Date(blog.date).toLocaleDateString()}</p>
              </div>

              <div className="flex justify-end items-center gap-4">
                <button
                  onClick={() => handleEdit(blog._id)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddBlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddBlog={handleAddBlog}
      />

      <UpdateBlogModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        blog={currentBlog}
        onUpdateBlog={handleUpdateBlog}
      />
    </div>
  );
};

export default ManageBlogs;
