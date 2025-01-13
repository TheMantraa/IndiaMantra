const express = require("express");
const { verifyAdmin } = require("../middlewares/authMiddleware");
const blogController = require("../controller/blogController");

const router = express.Router();

//public Route
router.get("/all", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);

// Protected routes for blogs
router.post("/add", verifyAdmin, blogController.addBlog);
router.put("/update/:id", verifyAdmin, blogController.updateBlog);
router.delete("/delete/:id", verifyAdmin, blogController.deleteBlog);

module.exports = router;
