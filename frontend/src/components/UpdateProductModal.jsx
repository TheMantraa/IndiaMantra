import React, { useState, useEffect } from "react";

const UpdateProductModal = ({
  isOpen,
  onClose,
  productData,
  onUpdateProduct,
}) => {
  const [formData, setFormData] = useState(productData || {});

  useEffect(() => {
    if (productData) {
      setFormData(productData);
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, key) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [key]: value.split(",").map((item) => item.trim()),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdateProduct(formData);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6  w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Contains Caffeine
            </label>
            <select
              name="containsCaffeine"
              value={formData.containsCaffeine || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Ingredients (comma-separated)
            </label>
            <input
              type="text"
              name="ingredients"
              value={
                formData.ingredients ? formData.ingredients.join(", ") : ""
              }
              onChange={(e) => handleArrayChange(e, "ingredients")}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows={3}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Benefits (comma-separated)
            </label>
            <input
              type="text"
              name="benefits"
              value={formData.benefits ? formData.benefits.join(", ") : ""}
              onChange={(e) => handleArrayChange(e, "benefits")}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Brewing Instructions
            </label>
            <textarea
              name="brewingInstructions"
              value={formData.brewingInstructions || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows={3}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Pro Tips</label>
            <textarea
              name="proTips"
              value={formData.proTips || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows={2}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Images (comma-separated URLs)
            </label>
            <input
              type="text"
              name="images"
              value={formData.images ? formData.images.join(", ") : ""}
              onChange={(e) => handleArrayChange(e, "images")}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
