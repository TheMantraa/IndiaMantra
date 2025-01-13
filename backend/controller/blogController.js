const Blog = require("../models/blog");

// Add a new blog
const addBlog = async (req, res) => {
  try {
    const { title, content, author, imgUrl } = req.body;

    if (!title || !content || !author || !imgUrl) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newBlog = new Blog({ title, content, author, imgUrl });
    await newBlog.save();

    return res
      .status(201)
      .json({ message: "Blog created successfully.", blog: newBlog });
  } catch (error) {
    console.error("Error adding blog:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }
    return res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, imgUrl } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, author, imgUrl },
      { new: true } // Return the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    return res
      .status(200)
      .json({ message: "Blog updated successfully.", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    return res.status(200).json({ message: "Blog deleted successfully." });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { addBlog, getAllBlogs, updateBlog, deleteBlog, getBlogById };
