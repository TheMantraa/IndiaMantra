const express = require("express");
const productController = require("../controller/productController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Public route: Get all products
router.get("/getAllProduct", productController.getAllProducts);
router.get("/getProductById/:id", productController.getProductById);
router.get(
  "/getProductByCategory/:category",
  productController.getProductByCategory
);

// Admin routes
router.post("/addProduct", verifyAdmin, productController.addProduct);
router.put("/updateProduct/:id", verifyAdmin, productController.updateProduct);
router.delete(
  "/deleteProduct/:id",
  verifyAdmin,
  productController.deleteProduct
);

module.exports = router;
