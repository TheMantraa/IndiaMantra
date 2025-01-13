import React, { useState } from "react";

const AddBlogModal = ({ isOpen, onClose, onAddBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    author: "",
    imgUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  const handleAddBlog = () => {
    if (
      !newBlog.title ||
      !newBlog.content ||
      !newBlog.author ||
      !newBlog.imgUrl
    ) {
      alert("All fields are required");
      return;
    }
    onAddBlog(newBlog);
    setNewBlog({
      title: "",
      content: "",
      author: "",
      imgUrl: "",
    });
    onClose(); // Close the modal after submitting
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-4">Add New Blog</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={newBlog.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Content</label>
            <textarea
              name="content"
              value={newBlog.content}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={newBlog.author}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Image URL</label>
            <input
              type="text"
              name="imgUrl"
              value={newBlog.imgUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddBlog}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add Blog
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-4 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogModal;
