import React, { useState } from "react";

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    containsCaffeine: false,
    ingredients: "",
    description: "",
    benefits: "",
    brewingInstructions: "",
    proTips: "",
    images: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setNewProduct({
      ...newProduct,
      containsCaffeine: e.target.checked,
    });
  };

  const handleAddProduct = () => {
    const formattedProduct = {
      ...newProduct,
      ingredients: newProduct.ingredients.split(","),
      benefits: newProduct.benefits.split(","),
      images: newProduct.images.split(","),
    };
    onAddProduct(formattedProduct); // Send product data to parent
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6  w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Contains Caffeine</label>
            <input
              type="checkbox"
              checked={newProduct.containsCaffeine}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Ingredients (comma separated)</label>
            <input
              type="text"
              name="ingredients"
              value={newProduct.ingredients}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Benefits (comma separated)</label>
            <input
              type="text"
              name="benefits"
              value={newProduct.benefits}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Brewing Instructions</label>
            <textarea
              name="brewingInstructions"
              value={newProduct.brewingInstructions}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Pro Tips</label>
            <input
              type="text"
              name="proTips"
              value={newProduct.proTips}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">
              Product Images (comma separated)
            </label>
            <input
              type="text"
              name="images"
              value={newProduct.images}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddProduct}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add Product
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

export default AddProductModal;
